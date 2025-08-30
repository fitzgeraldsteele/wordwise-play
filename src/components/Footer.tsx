import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">wordwise-play</span> • Author: Jerry Steele • Copyright 2025 • 
            <a 
              href="https://github.com/fitzgeraldsteele/wordwise-play" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 hover:text-primary transition-colors underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}