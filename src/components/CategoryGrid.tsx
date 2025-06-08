
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Camera, 
  Car, 
  Gamepad2, 
  Hammer, 
  Laptop, 
  Music, 
  Bike,
  Home
} from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Electronics', icon: Laptop, color: 'bg-blue-100 text-blue-600' },
  { name: 'Vehicles', icon: Car, color: 'bg-green-100 text-green-600' },
  { name: 'Photography', icon: Camera, color: 'bg-purple-100 text-purple-600' },
  { name: 'Gaming', icon: Gamepad2, color: 'bg-red-100 text-red-600' },
  { name: 'Tools', icon: Hammer, color: 'bg-orange-100 text-orange-600' },
  { name: 'Music', icon: Music, color: 'bg-pink-100 text-pink-600' },
  { name: 'Sports', icon: Bike, color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Home', icon: Home, color: 'bg-yellow-100 text-yellow-600' },
];

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {categories.map((category) => (
        <Card 
          key={category.name}
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => onCategorySelect(category.name)}
        >
          <CardContent className="p-3 text-center">
            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
              <category.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-medium">{category.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryGrid;
