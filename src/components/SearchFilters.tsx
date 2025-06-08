
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  category: string;
  setCategory: (category: string) => void;
  condition: string;
  setCondition: (condition: string) => void;
  distance: number;
  setDistance: (distance: number) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  condition,
  setCondition,
  distance,
  setDistance,
  onClearFilters
}) => {
  const categories = [
    'All Categories',
    'Electronics',
    'Furniture',
    'Vehicles',
    'Sports',
    'Tools',
    'Books',
    'Clothing',
    'Home & Garden'
  ];

  const conditions = [
    'All Conditions',
    'New',
    'Like New',
    'Good',
    'Fair'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium">Price Range (₹/day)</Label>
          <div className="mt-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={5000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-sm font-medium">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div>
          <Label className="text-sm font-medium">Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond}>
                  {cond}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Distance */}
        <div>
          <Label className="text-sm font-medium">Distance (km)</Label>
          <div className="mt-2">
            <Slider
              value={[distance]}
              onValueChange={(value) => setDistance(value[0])}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Within {distance} km
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
