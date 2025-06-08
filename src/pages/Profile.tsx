
import React, { useState } from 'react';
import { Settings, Star, Package, Heart, MapPin, Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { favorites } = useFavorites();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    city: '',
    bio: ''
  });

  React.useEffect(() => {
    if (profile) {
      setEditForm({
        name: profile.name || '',
        phone: profile.phone || '',
        city: profile.city || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleUpdateProfile = async () => {
    const { error } = await updateProfile(editForm);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Profile updated successfully!');
      setEditDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6 safe-area-padding-top">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <Input
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">City</label>
                        <Input
                          value={editForm.city}
                          onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Bio</label>
                        <Input
                          value={editForm.bio}
                          onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleUpdateProfile} className="w-full">
                        Update Profile
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{profile.email}</p>
                {profile.city && (
                  <div className="flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{profile.city}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({profile.review_count} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{profile.items_listed}</p>
                <p className="text-sm text-muted-foreground">Items Listed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{profile.items_rented}</p>
                <p className="text-sm text-muted-foreground">Items Rented</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">
                  {new Date().getFullYear() - new Date(profile.joined_date).getFullYear()}
                </p>
                <p className="text-sm text-muted-foreground">Years Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/add-item')}>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium">My Listings</p>
              <Badge variant="secondary" className="mt-1">
                {profile.items_listed} active
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/favorites')}>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="font-medium">Favorites</p>
              <Badge variant="secondary" className="mt-1">
                {favorites.length} saved
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-4">
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent activity</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by listing your first item!
                </p>
                <Button 
                  onClick={() => navigate('/add-item')} 
                  className="mt-4"
                >
                  Add Your First Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
