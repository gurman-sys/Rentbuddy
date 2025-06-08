
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'md', 
  showNumber = true 
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = rating >= starValue;
    const isHalfFilled = rating >= starValue - 0.5 && rating < starValue;

    return (
      <Star
        key={index}
        className={`${
          size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        } ${
          isFilled || isHalfFilled 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars}
      </div>
      {showNumber && (
        <span className={`${
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        } text-muted-foreground ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
