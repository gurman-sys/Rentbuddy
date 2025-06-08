
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  itemImage: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  itemId, 
  itemTitle, 
  itemPrice,
  itemImage,
  size = 'md' 
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isItemFavorite = isFavorite(itemId);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isItemFavorite) {
      removeFromFavorites(itemId);
      toast.success(`Removed "${itemTitle}" from favorites`);
    } else {
      addToFavorites({
        id: itemId,
        title: itemTitle,
        price: itemPrice,
        image: itemImage
      });
      toast.success(`Added "${itemTitle}" to favorites`);
    }
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className="hover:bg-red-50"
    >
      <Heart 
        className={`${iconSize} ${
          isItemFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'
        }`} 
      />
    </Button>
  );
};

export default FavoriteButton;
