
import { useState, useEffect } from 'react';

interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  image: string;
  addedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const newFavorite = {
      ...item,
      addedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (itemId: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
