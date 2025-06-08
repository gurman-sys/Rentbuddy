
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Coins, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SpinWheelProps {
  onReward: (reward: { type: string; amount: number; label: string }) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onReward }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [lastSpinTime, setLastSpinTime] = useState<Date | null>(null);

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
    
    return rewards[0]; // Fallback
  };

  const handleSpin = async () => {
    if (!canSpin) {
      toast.error('You can spin once every 24 hours!');
      return;
    }

    setIsSpinning(true);
    
    // Simulate spinning animation
    setTimeout(() => {
      const reward = getRandomReward();
      onReward(reward);
      
      toast.success(`🎉 Congratulations! You won ${reward.label}!`);
      
      setCanSpin(false);
      setLastSpinTime(new Date());
      setIsSpinning(false);
      
      // Reset after 24 hours (for demo, using 1 minute)
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
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Gift className="w-6 h-6 text-purple-600" />
          Daily Spin & Win
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="relative">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center ${isSpinning ? 'animate-spin' : ''}`}>
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Win up to ₹100 coins or discount coupons!
          </p>
          
          {canSpin ? (
            <Button 
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSpinning ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Spinning...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  Spin Now!
                </div>
              )}
            </Button>
          ) : (
            <div className="space-y-2">
              <Badge variant="secondary" className="w-full p-2">
                Next spin in: {timeUntilNextSpin() || 'Available now!'}
              </Badge>
              <Button variant="outline" disabled className="w-full">
                Come back tomorrow!
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-1 text-xs">
          {rewards.slice(0, 6).map((reward, index) => (
            <Badge key={index} variant="outline" className="text-xs p-1">
              {reward.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpinWheel;
