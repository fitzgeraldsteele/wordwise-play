import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, BookOpen, Users, RotateCcw, Plus } from 'lucide-react';
import { useSession } from '../contexts/SessionContext';
import { wordFamilies, getTotalWordsCount } from '../data/wordFamilies';
import Footer from '@/components/Footer';

export default function Complete() {
  const navigate = useNavigate();
  const { state, dispatch } = useSession();
  const [sessionDuration, setSessionDuration] = useState<string>('');

  // Calculate session stats
  useEffect(() => {
    if (state.startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      setSessionDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [state.startTime]);

  // Redirect if no completed session
  useEffect(() => {
    if (state.selectedFamilies.length === 0 || state.wordsViewed === 0) {
      navigate('/');
    }
  }, [state.selectedFamilies.length, state.wordsViewed, navigate]);

  const handleNewSession = () => {
    dispatch({ type: 'RESET_SESSION' });
    navigate('/setup');
  };

  const handleSameFamilies = () => {
    // Keep same families but reshuffle and restart
    dispatch({ type: 'SET_FAMILIES', families: state.selectedFamilies });
    dispatch({ type: 'START_SESSION' });
    navigate('/session');
  };

  const handleExit = () => {
    dispatch({ type: 'RESET_SESSION' });
    navigate('/');
  };

  const totalWords = getTotalWordsCount(state.selectedFamilies);
  const familiesCompleted = state.selectedFamilies.length;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 pb-16">
      <div className="max-w-4xl w-full">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4">
            Great Job!
          </h1>
          <p className="text-xl text-white/90">
            Session completed successfully
          </p>
        </div>

        {/* Stats Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-semibold">
              Session Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {/* Words Reviewed */}
              <div className="bg-white/10 rounded-lg p-6">
                <BookOpen className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">
                  {state.wordsViewed}
                </div>
                <div className="text-sm text-white/80">
                  Words Reviewed
                </div>
              </div>

              {/* Families Covered */}
              <div className="bg-white/10 rounded-lg p-6">
                <Users className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">
                  {familiesCompleted}
                </div>
                <div className="text-sm text-white/80">
                  Families Covered
                </div>
              </div>

              {/* Time Spent */}
              <div className="bg-white/10 rounded-lg p-6">
                <Clock className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">
                  {sessionDuration}
                </div>
                <div className="text-sm text-white/80">
                  Time Spent
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Families Completed */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Word Families Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {state.selectedFamilies.map((familyId) => {
                const family = wordFamilies[familyId];
                if (!family) return null;
                
                return (
                  <Badge 
                    key={familyId}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm"
                  >
                    {family.displayName} ({family.words.length} words)
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleNewSession}
            className="bg-white text-primary hover:bg-white/90 font-semibold py-6 text-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Session
          </Button>

          <Button
            onClick={handleSameFamilies}
            className="font-semibold py-6 text-lg"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Same Families Again
          </Button>

          <Button
            onClick={handleExit}
            className="font-semibold py-6 text-lg"
          >
            Exit to Home
          </Button>
        </div>

        {/* Encouraging Message */}
        <div className="text-center mt-8 mb-8">
          <p className="text-white/80 text-lg">
            Keep up the excellent teaching! Your students are building strong reading foundations.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
