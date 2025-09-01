import React from 'react';

interface WordFamilyIntroProps {
  rime: string; // e.g., "ight"
}

export function WordFamilyIntro({ rime }: WordFamilyIntroProps) {
  return (
    <div className="w-screen px-4 md:px-8">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <span className="block text-session-text text-word-display md:text-word-display font-bold tracking-wider leading-none whitespace-nowrap animate-flash-gentle" aria-label={`New word family: ${rime}`}>
            -{rime}
          </span>
        </div>
        <div className="text-sm md:text-base text-session-text/70 text-center select-none">
          New word family
        </div>
      </div>
    </div>
  );
}

export default WordFamilyIntro;
