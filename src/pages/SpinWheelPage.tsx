
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Gift, Star, Coins, Loader2, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SpinWheelPage = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [lastSpinTime, setLastSpinTime] = useState<Date | null>(null);
  const [walletBalance, setWalletBalance] = useState(250);
  const [recentWins, setRecentWins] = useState([
    { date: '2024-01-06', reward: '₹25 Coins', type: 'coins' },
    { date: '2024-01-05', reward: '10% Off Coupon', type: 'discount' },
    { date: '2024-01-04', reward: '₹10 Coins', type: 'coins' },
  ]);

  const rewards = [
    { type: 'coins', amount: 5, label: '₹5 Coins', probability: 0.3 },
    { type: 'coins', amount: 10, label: '₹10 Coins', probability: 0.25 },
    { type: 'coins', amount: 25, label: '₹25 Coins', probability: 0.15 },
    { type: 'coins', amount: 50, label: '₹50 Coins', probability: 0.1 },
    { type: 'coins', amount: 100, label: '₹100 Coins', probability: 0.05 },
    { type: 'discount', amount: 10, label: '10% Off Coupon', probability: 0.1 },
    { type: 'discount', amount: 20, label: '20% Off Coupon', probability: 0.05 }
  ];

  const getRandomReward = () => {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const reward of rewards) {
      cumulativeProbability += reward.probability;
      if (random <= cumulativeProbability) {
        return reward;
      }
    }
    
    return rewards[0];
  };

  const handleSpin = async () => {
    if (!canSpin) {
      toast.error('You can spin once every 24 hours!');
      return;
    }

    setIsSpinning(true);
    
    setTimeout(() => {
      const reward = getRandomReward();
      
      if (reward.type === 'coins') {
        setWalletBalance(prev => prev + reward.amount);
      }
      
      const newWin = {
        date: new Date().toISOString().split('T')[0],
        reward: reward.label,
        type: reward.type
      };
      
      setRecentWins(prev => [newWin, ...prev.slice(0, 4)]);
      
      toast.success(`🎉 Congratulations! You won ${reward.label}!`);
      
      setCanSpin(false);
      setLastSpinTime(new Date());
      setIsSpinning(false);
      
      setTimeout(() => {
        setCanSpin(true);
        toast.info('Spin wheel is available again!');
      }, 60000); // 1 minute for demo
      
    }, 3000);
  };

  const timeUntilNextSpin = () => {
    if (!lastSpinTime) return null;
    const nextSpinTime = new Date(lastSpinTime.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    const timeDiff = nextSpinTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) return null;
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Spin & Win</h1>
      </div>

      {/* Wallet Balance */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">₹{walletBalance}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/wallet')}
            >
              Manage Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Spin Wheel */}
      <Card className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Gift className="w-6 h-6 text-purple-600" />
            Daily Spin & Win
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Spin once every 24 hours for amazing rewards!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Spinning Wheel */}
          <div className="relative">
            <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center ${isSpinning ? 'animate-spin' : ''} transition-all duration-3000`}>
              <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-20 h-20 text-yellow-500" />
              </div>
            </div>
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500"></div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="space-y-4">
            {canSpin ? (
              <Button 
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
              >
                {isSpinning ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Spinning...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Spin Now!
                  </div>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Badge variant="secondary" className="w-full p-3 text-base">
                  <Clock className="w-4 h-4 mr-2" />
                  Next spin in: {timeUntilNextSpin() || 'Available now!'}
                </Badge>
                <Button variant="outline" disabled className="w-full h-12">
                  Come back tomorrow!
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Possible Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="p-3 text-center justify-center"
              >
                {reward.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Wins */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Wins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWins.map((win, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {win.type === 'coins' ? (
                    <Coins className="w-5 h-5 text-green-600" />
                  ) : (
                    <Gift className="w-5 h-5 text-purple-600" />
                  )}
                  <span className="font-medium">{win.reward}</span>
                </div>
                <span className="text-sm text-muted-foreground">{win.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpinWheelPage;
