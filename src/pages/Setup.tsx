import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { wordFamilyList } from '../data/wordFamilies';
import { useSession } from '../contexts/SessionContext';
import Footer from '@/components/Footer';

export default function Setup() {
  const navigate = useNavigate();
  const { dispatch } = useSession();
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const maxSelections = 4;

  const handleFamilyToggle = (familyId: string) => {
    setSelectedFamilies(prev => {
      if (prev.includes(familyId)) {
        return prev.filter(id => id !== familyId);
      } else if (prev.length < maxSelections) {
        return [...prev, familyId];
      } else {
        return prev;
      }
    });
  };

  const handleBeginSession = () => {
    if (selectedFamilies.length === 0) return;
    
    dispatch({ type: 'SET_FAMILIES', families: selectedFamilies });
    dispatch({ type: 'START_SESSION' });
    navigate('/session');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Choose Word Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            Select 1-{maxSelections} families for this session
          </p>
          <Badge 
            variant="secondary" 
            className="text-sm px-4 py-2"
          >
            {selectedFamilies.length} of {maxSelections} selected
          </Badge>
          {selectedFamilies.length >= maxSelections && (
            <p className="text-sm text-destructive mt-2">
              Maximum {maxSelections} families can be selected
            </p>
          )}
        </div>

        {/* Family Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {wordFamilyList.map((family) => {
            const isSelected = selectedFamilies.includes(family.id);
            const isDisabled = !isSelected && selectedFamilies.length >= maxSelections;
            
            return (
              <Card
                key={family.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                  isSelected 
                    ? 'bg-primary/5 border-primary shadow-card' 
                    : isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-primary/50 hover:-translate-y-1'
                }`}
                onClick={() => !isDisabled && handleFamilyToggle(family.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {family.displayName}
                    </CardTitle>
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => !isDisabled && handleFamilyToggle(family.id)}
                      className="touch-target"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Preview Words */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Example words:</p>
                    <div className="flex flex-wrap gap-2">
                      {family.words.slice(0, 4).map((word, index) => (
                        <span 
                          key={word.word}
                          className="text-sm bg-muted px-2 py-1 rounded"
                        >
                          <span className="text-onset font-medium">{word.onset}</span>
                          <span className="text-foreground">{word.rime}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Word Count */}
                  <Badge variant="outline" className="text-xs">
                    {family.words.length} words
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-card rounded-lg border shadow-card">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 touch-target"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Ready to start? Click Begin Session
            </p>
          </div>

          <Button
            onClick={handleBeginSession}
            disabled={selectedFamilies.length === 0}
            className="flex items-center gap-2 bg-session-progress hover:bg-session-progress/90 touch-target"
          >
            Begin Session
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}