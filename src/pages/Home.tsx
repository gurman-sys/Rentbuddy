
import React, { useState } from 'react';
import { Search, Bell, MapPin, Filter, Gift, Wallet as WalletIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockItems } from '@/data/mockData';
import ItemCard from '@/components/ItemCard';
import CategoryGrid from '@/components/CategoryGrid';
import TrendingFeed from '@/components/TrendingFeed';
import VoiceSearch from '@/components/VoiceSearch';
import SpinWheel from '@/components/SpinWheel';
import WalletCard from '@/components/WalletCard';
import NotificationBell from '@/components/NotificationBell';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation] = useState('Connaught Place, Delhi');
  const [walletBalance, setWalletBalance] = useState(100);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSpinReward = (reward: { type: string; amount: number; label: string }) => {
    if (reward.type === 'coins') {
      setWalletBalance(prev => prev + reward.amount);
    }
    // Discount coupons would be handled differently
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  const featuredItems = mockItems.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 safe-area-padding-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">RentEasy</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{userLocation}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/wallet')}
              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            >
              <WalletIcon className="w-4 h-4 mr-1" />
              ₹{walletBalance}
            </Button>
            <NotificationBell />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for cameras, bikes, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <VoiceSearch onVoiceResult={setSearchQuery} />
            <Button size="sm" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => navigate('/search')}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
            onClick={() => navigate('/spin-wheel')}
          >
            <Gift className="w-4 h-4 mr-2" />
            Spin & Win
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Wallet & Spin Wheel Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WalletCard />
          <SpinWheel onReward={handleSpinReward} />
        </div>

        {/* Categories */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

        {/* Featured Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Items</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => navigate(`/item/${item.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Trending Feed */}
        <TrendingFeed />
      </div>
    </div>
  );
};

export default Home;
