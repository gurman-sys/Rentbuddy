
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Edit Profile',
          action: () => navigate('/profile'),
          hasArrow: true
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          action: () => toast.info('Coming soon!'),
          hasArrow: true
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          label: 'Dark Mode',
          action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
          toggle: true,
          value: theme === 'dark'
        },
        {
          icon: Globe,
          label: 'Language',
          action: () => {},
          hasSelect: true
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          action: () => setNotifications(prev => ({ ...prev, push: !prev.push })),
          toggle: true,
          value: notifications.push
        },
        {
          icon: Bell,
          label: 'Email Notifications',
          action: () => setNotifications(prev => ({ ...prev, email: !prev.email })),
          toggle: true,
          value: notifications.email
        },
        {
          icon: Bell,
          label: 'SMS Notifications',
          action: () => setNotifications(prev => ({ ...prev, sms: !prev.sms })),
          toggle: true,
          value: notifications.sms
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          action: () => toast.info('Contact support at help@rentbuddy.com'),
          hasArrow: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 safe-area-padding-top">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.toggle && (
                        <Switch
                          checked={item.value}
                          onCheckedChange={() => item.action()}
                        />
                      )}
                      
                      {item.hasSelect && item.label === 'Language' && (
                        <Select defaultValue="en">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">हिंदी</SelectItem>
                            <SelectItem value="mr">मराठी</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      
                      {item.hasArrow && (
                        <Button variant="ghost" size="icon" onClick={item.action}>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {itemIndex < group.items.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Sign Out */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>RentBuddy v1.0.0</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
