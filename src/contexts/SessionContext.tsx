import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { WordData, wordFamilies, shuffleWords } from '../data/wordFamilies';

export interface SessionWord extends WordData {
  familyId: string;
}

export interface SessionState {
  selectedFamilies: string[];
  currentFamilyIndex: number;
  currentWordIndex: number;
  sessionWords: SessionWord[][];
  startTime: Date | null;
  wordsViewed: number;
  isActive: boolean;
  showingIntro: boolean; // whether to show intro screen for current family
  skipIntros: boolean;   // preference to skip intros
}

type SessionAction =
  | { type: 'SET_FAMILIES'; families: string[] }
  | { type: 'START_SESSION' }
  | { type: 'NEXT_WORD' }
  | { type: 'PREVIOUS_WORD' }
  | { type: 'END_SESSION' }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_SKIP_INTROS'; skip: boolean };

const initialState: SessionState = {
  selectedFamilies: [],
  currentFamilyIndex: 0,
  currentWordIndex: 0,
  sessionWords: [],
  startTime: null,
  wordsViewed: 0,
  isActive: false,
  showingIntro: false,
  skipIntros: false
};

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SET_FAMILIES':
      return {
        ...state,
        selectedFamilies: action.families,
        sessionWords: action.families.map(familyId => {
          const family = wordFamilies[familyId];
          if (!family) return [];
          
          return shuffleWords(family.words).map(word => ({
            ...word,
            familyId
          }));
        })
      };

    case 'START_SESSION':
      return {
        ...state,
        startTime: new Date(),
        isActive: true,
        currentFamilyIndex: 0,
        currentWordIndex: 0,
        wordsViewed: 0,
        showingIntro: state.skipIntros ? false : true
      };

    case 'NEXT_WORD': {
      const currentFamily = state.sessionWords[state.currentFamilyIndex];
      if (!currentFamily) return state;

      // If currently showing an intro screen, dismiss it without advancing counters
      if (state.showingIntro) {
        return {
          ...state,
          showingIntro: false
        };
      }

      let newWordsViewed = state.wordsViewed + 1;
      
      // Check if we can move to next word in current family
      if (state.currentWordIndex < currentFamily.length - 1) {
        return {
          ...state,
          currentWordIndex: state.currentWordIndex + 1,
          wordsViewed: newWordsViewed
        };
      }
      
      // Check if we can move to next family
      if (state.currentFamilyIndex < state.sessionWords.length - 1) {
        return {
          ...state,
          currentFamilyIndex: state.currentFamilyIndex + 1,
          currentWordIndex: 0,
          wordsViewed: newWordsViewed,
          showingIntro: state.skipIntros ? false : true
        };
      }
      
      // Session complete
      return {
        ...state,
        isActive: false,
        wordsViewed: newWordsViewed
      };
    }

    case 'PREVIOUS_WORD': {
      // If currently on intro for this family, go to previous family's last word if possible
      if (state.showingIntro) {
        if (state.currentFamilyIndex > 0) {
          const previousFamilyIndex = state.currentFamilyIndex - 1;
          const previousFamily = state.sessionWords[previousFamilyIndex];
          return {
            ...state,
            currentFamilyIndex: previousFamilyIndex,
            currentWordIndex: previousFamily.length - 1,
            showingIntro: false
          };
        }
        return state;
      }

      // If on the first word of the family, go to intro (unless skipping intros)
      if (state.currentWordIndex === 0) {
        if (!state.skipIntros) {
          return {
            ...state,
            showingIntro: true
          };
        }
        // else if skipping intros, jump to previous family last word
        if (state.currentFamilyIndex > 0) {
          const previousFamilyIndex = state.currentFamilyIndex - 1;
          const previousFamily = state.sessionWords[previousFamilyIndex];
          return {
            ...state,
            currentFamilyIndex: previousFamilyIndex,
            currentWordIndex: previousFamily.length - 1
          };
        }
        return state;
      }

      // Otherwise go back within the family
      return {
        ...state,
        currentWordIndex: state.currentWordIndex - 1
      };
    }

    case 'END_SESSION':
      return {
        ...state,
        isActive: false
      };

    case 'RESET_SESSION':
      return initialState;

    case 'SET_SKIP_INTROS': {
      } catch (err) {
        console.error('Failed to persist skipIntros preference:', err);
      }
      return {
        ...state,
        skipIntros: action.skip
      };
    }

    default:
      return state;
  }
}

const SessionContext = createContext<{
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
} | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    sessionReducer,
    initialState,
    (base) => {
      let skip = false;
      try {
        skip = localStorage.getItem('wwp:skipIntros') === 'true';
      } catch {}
      return {
        ...base,
        skipIntros: skip
      };
    }
  );

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

// Helper hooks
export function useCurrentWord(): SessionWord | null {
  const { state } = useSession();
  const currentFamily = state.sessionWords[state.currentFamilyIndex];
  if (!currentFamily) return null;
  return currentFamily[state.currentWordIndex] || null;
}

export function useSessionProgress() {
  const { state } = useSession();
  
  const totalWords = state.sessionWords.reduce(
    (total, family) => total + family.length, 
    0
  );
  
  const previousWordsCount = state.sessionWords
    .slice(0, state.currentFamilyIndex)
    .reduce((sum, family) => sum + family.length, 0);

  const offset = state.showingIntro ? 0 : (state.currentWordIndex + 1);
  const currentPosition = previousWordsCount + offset;
    
  return {
    current: Math.min(currentPosition, totalWords),
    total: totalWords,
    percentage: totalWords > 0 ? (currentPosition / totalWords) * 100 : 0
  };
}