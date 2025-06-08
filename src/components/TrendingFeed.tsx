
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Clock } from 'lucide-react';

interface TrendingActivity {
  id: string;
  userName: string;
  itemName: string;
  location: string;
  action: 'rented' | 'listed' | 'requested';
  timeAgo: string;
  isHot?: boolean;
}

const TrendingFeed: React.FC = () => {
  const [activities, setActivities] = useState<TrendingActivity[]>([
    {
      id: '1',
      userName: 'Aman',
      itemName: 'DSLR Camera',
      location: 'Lajpat Nagar',
      action: 'rented',
      timeAgo: '2 min ago',
      isHot: true
    },
    {
      id: '2',
      userName: 'Priya',
      itemName: 'MacBook Pro',
      location: 'Connaught Place',
      action: 'listed',
      timeAgo: '5 min ago'
    },
    {
      id: '3',
      userName: 'Rahul',
      itemName: 'Gaming Setup',
      location: 'Karol Bagh',
      action: 'rented',
      timeAgo: '8 min ago',
      isHot: true
    },
    {
      id: '4',
      userName: 'Sneha',
      itemName: 'Projector',
      location: 'Nehru Place',
      action: 'requested',
      timeAgo: '12 min ago'
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: TrendingActivity = {
        id: Date.now().toString(),
        userName: ['Arjun', 'Kavya', 'Rohan', 'Anita'][Math.floor(Math.random() * 4)],
        itemName: ['Drone', 'Bike', 'Microphone', 'Lights', 'Speaker'][Math.floor(Math.random() * 5)],
        location: ['CP', 'Saket', 'GK', 'Dwarka'][Math.floor(Math.random() * 4)],
        action: ['rented', 'listed', 'requested'][Math.floor(Math.random() * 3)] as any,
        timeAgo: 'just now',
        isHot: Math.random() > 0.7
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 10000); // Add new activity every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'rented': return 'text-green-600';
      case 'listed': return 'text-blue-600';
      case 'requested': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'rented': return 'rented';
      case 'listed': return 'listed';
      case 'requested': return 'is looking for';
      default: return action;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          Live Feed
          <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              {activity.isHot && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mt-2"></div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.userName}</span>
                  <span className={`mx-1 ${getActionColor(activity.action)}`}>
                    {getActionText(activity.action)}
                  </span>
                  <span className="font-medium">{activity.itemName}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {activity.timeAgo}
                  </div>
                  {activity.isHot && (
                    <Badge variant="destructive" className="text-xs">HOT</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingFeed;
