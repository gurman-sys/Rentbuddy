
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationBell: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from John about Camera rental',
      time: '2 min ago',
      read: false
    },
    {
      id: '2',
      title: 'Booking Confirmed',
      message: 'Your booking for Gaming Laptop has been confirmed',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'Item Available',
      message: 'iPhone 15 Pro is now available for rent',
      time: '3 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 border-b ${!notification.read ? 'bg-muted/50' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
