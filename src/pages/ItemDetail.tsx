
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockItems } from '@/data/mockData';
import { toast } from 'sonner';
import ImageGallery from '@/components/ImageGallery';
import FavoriteButton from '@/components/FavoriteButton';
import RatingStars from '@/components/RatingStars';
import BookingModal from '@/components/BookingModal';
import MapTrace from '@/components/MapTrace';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Item not found</p>
      </div>
    );
  }

  // Fix image URLs - use proper placeholder images
  const fixedImages = item.images.map(img => {
    if (img.startsWith('/') || img.includes('placeholder')) {
      // Replace with working placeholder images
      const placeholders = [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400'
      ];
      return placeholders[Math.floor(Math.random() * placeholders.length)];
    }
    return img;
  });

  const itemWithFixedImages = { ...item, images: fixedImages };

  const handleRentRequest = () => {
    setIsBookingOpen(true);
  };

  const handleMessageOwner = () => {
    navigate('/messages');
    toast.success('Opening chat with owner...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 safe-area-padding-top">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <FavoriteButton 
            itemId={item.id} 
            itemTitle={item.title}
            itemPrice={item.price}
            itemImage={fixedImages[0]}
            size="lg" 
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Image Gallery */}
        <div className="px-4">
          <ImageGallery images={fixedImages} title={item.title} />
          <Badge 
            variant={item.isAvailable ? "default" : "secondary"}
            className="absolute top-4 right-4"
          >
            {item.isAvailable ? 'Available' : 'Rented'}
          </Badge>
        </div>

        <div className="p-4 space-y-4">
          {/* Title and Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <span className="text-2xl font-bold text-primary">₹{item.price}/day</span>
            </div>
            <Badge variant="outline">{item.category}</Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          {/* Map Trace Component */}
          <MapTrace itemLocation={item.location} itemTitle={item.title} />

          {/* Owner Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Owner</h3>
              <div className="flex items-center gap-3">
                <img
                  src={item.owner.avatar}
                  alt={item.owner.name}
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{item.owner.name}</p>
                  <RatingStars rating={item.owner.rating} size="sm" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMessageOwner}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={handleRentRequest}
              disabled={!item.isAvailable}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {item.isAvailable ? 'Book Now' : 'Currently Unavailable'}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleMessageOwner}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Owner
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        item={itemWithFixedImages}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default ItemDetail;
