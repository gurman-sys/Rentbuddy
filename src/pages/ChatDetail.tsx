
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MapPin, Phone, Star, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockItems, mockUser } from '../data/mockData';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const ChatDetail: React.FC = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(100); // Get from context/localStorage
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversation data
  const conversation = {
    id: conversationId,
    otherUser: {
      id: '2',
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      phone: '+91 98765 43210',
      rating: 4.8,
      isVerified: true
    },
    item: {
      id: '1',
      title: 'Professional Camera Canon EOS',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      price: 50,
      securityDeposit: 200
    }
  };

  // Mock messages
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        senderId: '2',
        message: 'Hi, is the camera still available for this weekend?',
        timestamp: '2024-01-15T10:30:00Z',
        isRead: true
      },
      {
        id: '2',
        senderId: mockUser.id,
        message: 'Yes, it\'s available! What dates do you need it?',
        timestamp: '2024-01-15T10:35:00Z',
        isRead: true
      },
      {
        id: '3',
        senderId: '2',
        message: 'I need it from Saturday to Sunday. Can we meet at your location?',
        timestamp: '2024-01-15T10:40:00Z',
        isRead: true
      },
      {
        id: '4',
        senderId: mockUser.id,
        message: 'Perfect! I\'m available in Connaught Place area. What time works for you?',
        timestamp: '2024-01-15T10:45:00Z',
        isRead: true
      }
    ];
    setMessages(mockMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: mockUser.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handlePayment = (amount: number, type: 'rent' | 'deposit') => {
    if (userBalance < amount) {
      toast.error(`Insufficient balance! You need ₹${amount - userBalance} more.`);
      return;
    }

    setUserBalance(prev => prev - amount);
    setIsPaymentOpen(false);
    
    const paymentMessage = `Payment of ₹${amount} for ${type} completed successfully! 💰`;
    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: mockUser.id,
      message: paymentMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    toast.success(`Payment successful! ₹${amount} deducted from wallet.`);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const totalAmount = conversation.item.price + conversation.item.securityDeposit;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 safe-area-padding-top">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img
            src={conversation.otherUser.avatar}
            alt={conversation.otherUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{conversation.otherUser.name}</h2>
              {conversation.otherUser.isVerified && (
                <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{conversation.otherUser.rating}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        </div>

        {/* Item Info */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <img
                src={conversation.item.image}
                alt={conversation.item.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{conversation.item.title}</h3>
                <p className="text-sm text-primary font-semibold">₹{conversation.item.price}/day</p>
                <p className="text-xs text-muted-foreground">Security: ₹{conversation.item.securityDeposit}</p>
              </div>
              <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Complete Payment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Wallet Balance */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Wallet Balance</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600">₹{userBalance}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rental Amount (1 day)</span>
                        <span>₹{conversation.item.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Deposit</span>
                        <span>₹{conversation.item.securityDeposit}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      {userBalance < totalAmount && (
                        <p className="text-sm text-red-600">
                          Insufficient balance! You need ₹{totalAmount - userBalance} more.
                        </p>
                      )}
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => handlePayment(totalAmount, 'rent')}
                        disabled={userBalance < totalAmount}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Pay ₹{totalAmount} from Wallet
                      </Button>
                      
                      {userBalance < totalAmount && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate('/wallet')}
                        >
                          Add Money to Wallet
                        </Button>
                      )}
                    </div>

                    {/* Security Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        💡 Security deposit will be refunded after returning the item in good condition.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === mockUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.senderId === mockUser.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === mockUser.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
