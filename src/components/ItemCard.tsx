
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import RatingStars from '@/components/RatingStars';
import FavoriteButton from '@/components/FavoriteButton';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
  location: string;
  images: string[];
  isAvailable: boolean;
}

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  // Fix image URL
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('/') || imageUrl.includes('placeholder')) {
      // Use working placeholder images
      const placeholders = [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400'
      ];
      return placeholders[Math.floor(Math.random() * placeholders.length)];
    }
    return imageUrl;
  };

  const imageUrl = getImageUrl(item.images[0] || '');
  const ownerAvatarUrl = item.owner.avatar.startsWith('/') 
    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    : item.owner.avatar;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400';
            }}
          />
          <Badge 
            variant={item.isAvailable ? "default" : "secondary"}
            className="absolute top-2 right-2"
          >
            {item.isAvailable ? 'Available' : 'Rented'}
          </Badge>
          <div className="absolute top-2 left-2">
            <FavoriteButton 
              itemId={item.id} 
              itemTitle={item.title}
              itemPrice={item.price}
              itemImage={imageUrl}
              size="sm" 
            />
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">{item.title}</h3>
            <span className="text-lg font-bold text-primary">₹{item.price}/day</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={ownerAvatarUrl}
                alt={item.owner.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
                }}
              />
              <span className="text-sm">{item.owner.name}</span>
              <RatingStars rating={item.owner.rating} size="sm" showNumber={false} />
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{item.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
