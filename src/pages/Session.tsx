import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSession, useCurrentWord, useSessionProgress } from '../contexts/SessionContext';
import { wordFamilies } from '../data/wordFamilies';
import WordFamilyIntro from '@/components/WordFamilyIntro';

export default function Session() {
  const navigate = useNavigate();
  const { state, dispatch } = useSession();
  const currentWord = useCurrentWord();
  const progress = useSessionProgress();

  // Redirect if no session
  useEffect(() => {
    if (state.selectedFamilies.length === 0) {
      navigate('/setup');
    }
  }, [state.selectedFamilies.length, navigate]);

  // Check if session is complete
  useEffect(() => {
    if (!state.isActive && state.wordsViewed > 0) {
      navigate('/complete');
    }
  }, [state.isActive, state.wordsViewed, navigate]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_WORD' });
  }, [dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch({ type: 'PREVIOUS_WORD' });
  }, [dispatch]);

  const handleExit = useCallback(() => {
    dispatch({ type: 'END_SESSION' });
    navigate('/');
  }, [dispatch, navigate]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':  // Spacebar
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'Escape':
          e.preventDefault();
          handleExit();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious, handleExit]);

  // Touch navigation zones
  const handleTouchZone = (zone: 'left' | 'right') => {
    console.log(`Touch zone activated: ${zone}`); // Debug log
    if (zone === 'left' && canGoPrevious) {
      handlePrevious();
    } else if (zone === 'right') {
      handleNext();
    }
  };

  // Simplified touch and click handling
  const handleZoneInteraction = (zone: 'left' | 'right') => {
    handleTouchZone(zone);
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-session flex items-center justify-center">
        <div className="text-session-text text-center">
          <h2 className="text-4xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const currentFamily = wordFamilies[currentWord.familyId];
  const canGoPrevious = state.showingIntro
    ? state.currentFamilyIndex > 0
    : (state.currentFamilyIndex > 0 || state.currentWordIndex > 0);
  const displayCurrent = state.showingIntro
    ? Math.min(progress.current + 1, progress.total)
    : progress.current;

  return (
    <div className="min-h-screen bg-session text-session-text relative overflow-hidden">
      {/* HUD Elements */}
      <div className="absolute top-4 left-4 z-10">
        <div className="text-sm opacity-70">
          Word {displayCurrent} of {progress.total}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExit}
          className="text-session-text hover:bg-white/10 touch-target"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <div className="text-sm opacity-70">
          Family: {currentFamily?.displayName}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 hidden md:block">
        <div className="text-sm opacity-70 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <ArrowRight className="h-4 w-4" />
          Navigate
        </div>
      </div>

      {/* Mobile Touch Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
        <div className="text-xs opacity-70 text-center">
          Tap left to go back • Tap right to advance
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-progress transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Main Display Area */}
      <div className="flex h-screen">
        {/* Left Touch Zone - Previous */}
        <div 
          className="flex-none basis-[var(--session-rail)] flex items-center justify-end pr-4 cursor-pointer select-none touch-manipulation border-r-2 border-white/30 relative"
          onClick={() => canGoPrevious && handleZoneInteraction('left')}
          onTouchEnd={() => canGoPrevious && handleZoneInteraction('left')}
          style={{ 
            backgroundColor: canGoPrevious ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
            opacity: 1,
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {/* Touch zone label */}
          <div className="absolute top-4 left-4 text-xs opacity-80 font-medium">
            {canGoPrevious ? 'BACK' : 'START'}
          </div>
          <div className={`transition-opacity duration-200 p-8 ${canGoPrevious ? 'opacity-60 hover:opacity-80 active:opacity-90' : 'opacity-30'}`}>
            <ArrowLeft className="h-12 w-12" />
          </div>
        </div>

        {/* Center Display - Intro or Word */}
        <div className="flex-1 min-w-0 flex items-center justify-center pointer-events-none">
          <div className="w-full px-4 md:px-8 animate-word-enter">
            {state.showingIntro ? (
              <div className="flex items-center justify-center">
                <WordFamilyIntro rime={currentFamily?.rime || ''} />
              </div>
            ) : (
              <div className="grid grid-cols-2 items-baseline">
                <div className="text-right">
                  <span className="text-session-onset text-word-display md:text-word-display font-bold tracking-wider leading-none whitespace-nowrap">
                    {currentWord.onset}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-session-text text-word-display md:text-word-display font-bold tracking-wider leading-none whitespace-nowrap">
                    {currentWord.rime}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Touch Zone - Next */}
        <div 
          className="flex-none basis-[var(--session-rail)] flex items-center justify-start pl-4 cursor-pointer select-none touch-manipulation border-l-2 border-white/30 relative"
          onClick={() => handleZoneInteraction('right')}
          onTouchEnd={() => handleZoneInteraction('right')}
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {/* Touch zone label */}
          <div className="absolute top-4 right-4 text-xs opacity-80 font-medium">
            NEXT
          </div>
          <div className="opacity-60 hover:opacity-80 active:opacity-90 transition-opacity duration-200 p-8">
            <ArrowRight className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}