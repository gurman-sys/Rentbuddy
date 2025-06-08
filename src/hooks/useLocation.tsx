
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationData {
  coords: LocationCoords | null;
  address: string | null;
  loading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    coords: null,
    address: null,
    loading: false,
    error: null
  });

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser'
      }));
      toast.error('Location not supported on this device');
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Get address from coordinates (mock implementation)
      const address = await getAddressFromCoords(coords);

      setLocation({
        coords,
        address,
        loading: false,
        error: null
      });

      toast.success('Location accessed successfully!');
    } catch (error: any) {
      let errorMessage = 'Failed to get location';
      
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = 'Location permission denied';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = 'Location information unavailable';
      } else if (error.code === error.TIMEOUT) {
        errorMessage = 'Location request timed out';
      }

      setLocation(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      toast.error(errorMessage);
    }
  };

  const getAddressFromCoords = async (coords: LocationCoords): Promise<string> => {
    // Mock address based on coordinates (in real app, use reverse geocoding API)
    const cities = [
      'Connaught Place, New Delhi',
      'Karol Bagh, New Delhi',
      'Lajpat Nagar, New Delhi',
      'Nehru Place, New Delhi',
      'Khan Market, New Delhi'
    ];
    
    return cities[Math.floor(Math.random() * cities.length)];
  };

  return {
    ...location,
    requestLocation
  };
};
