
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  city?: string;
  bio?: string;
  rating: number;
  review_count: number;
  items_listed: number;
  items_rented: number;
  joined_date: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user found' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        return { error: error.message };
      }

      // Refresh profile data
      await fetchProfile();
      return { error: null };
    } catch (err) {
      return { error: 'Failed to update profile' };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, loading, error, updateProfile, refetch: fetchProfile };
};
