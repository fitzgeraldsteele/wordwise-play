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
}

type SessionAction =
  | { type: 'SET_FAMILIES'; families: string[] }
  | { type: 'START_SESSION' }
  | { type: 'NEXT_WORD' }
  | { type: 'PREVIOUS_WORD' }
  | { type: 'END_SESSION' }
  | { type: 'RESET_SESSION' };

const initialState: SessionState = {
  selectedFamilies: [],
  currentFamilyIndex: 0,
  currentWordIndex: 0,
  sessionWords: [],
  startTime: null,
  wordsViewed: 0,
  isActive: false
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
        wordsViewed: 0
      };

    case 'NEXT_WORD': {
      const currentFamily = state.sessionWords[state.currentFamilyIndex];
      if (!currentFamily) return state;

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
          wordsViewed: newWordsViewed
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
      // Check if we can go back in current family
      if (state.currentWordIndex > 0) {
        return {
          ...state,
          currentWordIndex: state.currentWordIndex - 1
        };
      }
      
      // Check if we can go to previous family
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

    case 'END_SESSION':
      return {
        ...state,
        isActive: false
      };

    case 'RESET_SESSION':
      return initialState;

    default:
      return state;
  }
}

const SessionContext = createContext<{
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
} | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

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
  
  const currentPosition = state.sessionWords
    .slice(0, state.currentFamilyIndex)
    .reduce((sum, family) => sum + family.length, 0) + 
    state.currentWordIndex + 1;
    
  return {
    current: Math.min(currentPosition, totalWords),
    total: totalWords,
    percentage: totalWords > 0 ? (currentPosition / totalWords) * 100 : 0
  };
}