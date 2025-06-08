
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ItemCard from '@/components/ItemCard';
import SearchFilters from '@/components/SearchFilters';
import VoiceSearch from '@/components/VoiceSearch';
import { mockItems } from '@/data/mockData';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [category, setCategory] = useState(searchParams.get('category') || 'All Categories');
  const [condition, setCondition] = useState('All Conditions');
  const [distance, setDistance] = useState(25);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const query = searchParams.get('q');
    const cat = searchParams.get('category');
    
    if (query) setSearchQuery(query);
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'All Categories' || item.category === category;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.owner.rating - a.owner.rating;
      case 'newest':
        return new Date().getTime() - new Date().getTime(); // Mock newest
      default:
        return 0;
    }
  });

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setCategory('All Categories');
    setCondition('All Conditions');
    setDistance(25);
  };

  const activeFilterCount = [
    category !== 'All Categories',
    condition !== 'All Conditions',
    priceRange[0] > 0 || priceRange[1] < 5000,
    distance < 25
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 safe-area-padding-top">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Search Results</h1>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
          </div>
          <VoiceSearch onVoiceResult={handleVoiceResult} />
          
          {/* Filters Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <SearchFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                  condition={condition}
                  setCondition={setCondition}
                  distance={distance}
                  setDistance={setDistance}
                  onClearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="p-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {sortedItems.length} results found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="relevance">Most Relevant</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {category !== 'All Categories' && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setCategory('All Categories')}
              >
                {category} ×
              </Button>
            )}
            {condition !== 'All Conditions' && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setCondition('All Conditions')}
              >
                {condition} ×
              </Button>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 5000) && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setPriceRange([0, 5000])}
              >
                ₹{priceRange[0]}-₹{priceRange[1]} ×
              </Button>
            )}
          </div>
        )}

        {/* Results */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sortedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/item/${item.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No items found matching your search criteria
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
