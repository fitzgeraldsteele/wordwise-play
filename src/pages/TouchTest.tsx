import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import Footer from '@/components/Footer';

export default function TouchTest() {
  const navigate = useNavigate();
  const { dispatch } = useSession();

  useEffect(() => {
    // Automatically set up a test session with a few word families
    const testFamilies = ['at', 'an']; // Two simple families for testing
    dispatch({ type: 'SET_FAMILIES', families: testFamilies });
    dispatch({ type: 'START_SESSION' });
    
    // Navigate to session after a brief delay
    const timer = setTimeout(() => {
      navigate('/session');
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-session flex items-center justify-center pb-16">
      <div className="text-session-text text-center">
        <h2 className="text-4xl font-bold mb-4">Setting up touch test...</h2>
        <p className="text-lg opacity-70">Redirecting to session...</p>
      </div>
      <Footer />
    </div>
  );
}