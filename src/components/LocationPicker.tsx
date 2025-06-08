
import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from '@/hooks/useLocation';

interface LocationPickerProps {
  onLocationSelect?: (address: string, coords: { latitude: number; longitude: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const { coords, address, loading, error, requestLocation } = useLocation();

  const handleLocationRequest = async () => {
    await requestLocation();
    if (coords && address && onLocationSelect) {
      onLocationSelect(address, coords);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Your Location</h3>
          </div>

          {address ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current location:</p>
              <p className="font-medium">{address}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocationRequest}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 mr-2" />
                )}
                Update Location
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Allow location access to see items near you
              </p>
              <Button
                onClick={handleLocationRequest}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Getting Location...' : 'Allow Location Access'}
              </Button>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;
