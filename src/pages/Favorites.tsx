
import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import { mockItems } from '@/data/mockData';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const favoriteItems = mockItems.filter(item => 
    favorites.some(fav => fav.id === item.id)
  );

  const handleRemoveFromFavorites = (itemId: string, itemTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromFavorites(itemId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 safe-area-padding-top">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">My Favorites</h1>
          <Heart className="w-5 h-5 text-red-500 ml-auto" />
        </div>
      </div>

      <div className="p-4">
        {favoriteItems.length > 0 ? (
          <div className="space-y-4">
            {favoriteItems.map((item) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative">
                      <img
                        src={item.images[0] || '/placeholder.svg'}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">₹{item.price}/day</span>
                            <span className="text-xs text-muted-foreground">{item.location}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleRemoveFromFavorites(item.id, item.title, e)}
                          className="ml-2 hover:bg-red-50"
                        >
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-4">
                Start adding items to your favorites to see them here
              </p>
              <Button onClick={() => navigate('/')}>
                Browse Items
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;
