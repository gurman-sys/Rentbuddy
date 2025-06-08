
import React, { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockItems, mockUser } from '../data/mockData';

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
  };
  item: {
    id: string;
    title: string;
    image: string;
  };
  lastMessage: ChatMessage;
  unreadCount: number;
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      otherUser: {
        id: '2',
        name: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      item: {
        id: '1',
        title: 'Professional Camera Canon EOS',
        image: mockItems[0].images[0]
      },
      lastMessage: {
        id: '1',
        senderId: '2',
        message: 'Hi, is the camera still available for this weekend?',
        timestamp: '2024-01-15T10:30:00Z',
        isRead: false
      },
      unreadCount: 2
    },
    {
      id: '2',
      otherUser: {
        id: '3',
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      item: {
        id: '2',
        title: 'Power Drill Set',
        image: mockItems[1].images[0]
      },
      lastMessage: {
        id: '2',
        senderId: mockUser.id,
        message: 'Sure! The drill is in excellent condition.',
        timestamp: '2024-01-14T15:20:00Z',
        isRead: true
      },
      unreadCount: 0
    },
    {
      id: '3',
      otherUser: {
        id: '4',
        name: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      item: {
        id: '3',
        title: 'Mountain Bike',
        image: mockItems[2].images[0]
      },
      lastMessage: {
        id: '3',
        senderId: '4',
        message: 'Thank you for the bike! It was perfect.',
        timestamp: '2024-01-13T09:15:00Z',
        isRead: true
      },
      unreadCount: 0
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    !searchQuery || 
    conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-IN');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 safe-area-padding-top">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-4 space-y-3">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <Card 
              key={conversation.id} 
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => navigate(`/chat/${conversation.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={conversation.otherUser.avatar}
                      alt={conversation.otherUser.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium truncate">{conversation.otherUser.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={conversation.item.image}
                        alt={conversation.item.title}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-sm text-muted-foreground truncate">
                        {conversation.item.title}
                      </span>
                    </div>

                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}>
                      {conversation.lastMessage.senderId === mockUser.id ? 'You: ' : ''}
                      {conversation.lastMessage.message}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="bg-primary">
                        New
                      </Badge>
                    )}
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-muted-foreground mb-4">
              Start renting items to begin chatting with owners
            </p>
            <Button onClick={() => navigate('/')}>
              Browse Items
            </Button>
          </div>
        )}

        {searchQuery && filteredConversations.length === 0 && conversations.length > 0 && (
          <div className="text-center py-8">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversations match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
