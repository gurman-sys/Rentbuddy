
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Route } from 'lucide-react';
import { toast } from 'sonner';

interface MapTraceProps {
  itemLocation: string;
  itemTitle: string;
}

const MapTrace: React.FC<MapTraceProps> = ({ itemLocation, itemTitle }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<string>('');
  const [showRoute, setShowRoute] = useState(false);
  const [distance, setDistance] = useState<string>('');
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  // Mock coordinates for Delhi locations
  const getCoordinates = (location: string) => {
    const locations: { [key: string]: [number, number] } = {
      'Connaught Place, New Delhi': [77.2167, 28.6333],
      'Karol Bagh, New Delhi': [77.1906, 28.6519],
      'Lajpat Nagar, New Delhi': [77.2496, 28.5667],
      'Nehru Place, New Delhi': [77.2507, 28.5495],
      'Khan Market, New Delhi': [77.2267, 28.5983],
      'Rajouri Garden, New Delhi': [77.1167, 28.6500],
      'Dwarka, New Delhi': [77.0469, 28.5921]
    };
    
    return locations[location] || [77.2090, 28.6139]; // Default to Delhi center
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Mock reverse geocoding
          setUserLocation('Your Current Location');
          calculateRoute();
          toast.success('Location found successfully!');
        },
        (error) => {
          toast.error('Unable to get your location');
          setUserLocation('Location access denied');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const calculateRoute = () => {
    // Mock route calculation
    const distances = ['1.2 km', '2.5 km', '3.8 km', '5.1 km', '6.7 km'];
    const times = ['5 mins', '10 mins', '15 mins', '20 mins', '25 mins'];
    
    const randomIndex = Math.floor(Math.random() * distances.length);
    setDistance(distances[randomIndex]);
    setEstimatedTime(times[randomIndex]);
    setShowRoute(true);
    
    toast.success('Route calculated successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location & Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Item Location */}
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Item Location</p>
          <p className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            {itemLocation}
          </p>
        </div>

        {/* User Location Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Location</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your address or use GPS"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={getCurrentLocation}>
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Route Calculation */}
        <Button 
          onClick={calculateRoute} 
          className="w-full"
          disabled={!userLocation}
        >
          <Route className="w-4 h-4 mr-2" />
          Calculate Route
        </Button>

        {/* Route Information */}
        {showRoute && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-lg font-bold text-green-600">{distance}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-lg font-bold text-blue-600">{estimatedTime}</p>
              </div>
            </div>
            
            {/* Mock Map View */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Map View</p>
                <p className="text-xs text-muted-foreground">Route from your location to {itemTitle}</p>
              </div>
            </div>

            {/* Route Options */}
            <div className="space-y-2">
              <p className="font-medium">Transportation Options:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">🚗 Car</Button>
                <Button variant="outline" size="sm">🏍️ Bike</Button>
                <Button variant="outline" size="sm">🚇 Metro</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapTrace;
