
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/');
        } else {
          navigate('/auth');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, user, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">RentBuddy</h1>
          <p className="text-xl opacity-90">Rent anything, anywhere</p>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
