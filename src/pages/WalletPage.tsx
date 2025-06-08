
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0); // Start with ₹0 for new users
  const [addAmount, setAddAmount] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const transactions = [
    { id: 1, type: 'credit', amount: 25, description: 'Welcome Bonus', date: '2024-01-06', icon: Gift },
    { id: 2, type: 'credit', amount: 50, description: 'Spin & Win Reward', date: '2024-01-05', icon: Gift },
    { id: 3, type: 'debit', amount: 30, description: 'Camera Rental Payment', date: '2024-01-04', icon: ArrowDownLeft },
    { id: 4, type: 'credit', amount: 100, description: 'Wallet Top-up', date: '2024-01-03', icon: Plus },
    { id: 5, type: 'debit', amount: 25, description: 'Projector Rental', date: '2024-01-02', icon: ArrowDownLeft },
  ];

  const quickAmounts = [50, 100, 200, 500, 1000];

  const handleAddMoney = (amount: number) => {
    if (!isVerified) {
      toast.error('Please verify your account first to add money');
      return;
    }
    
    setBalance(prev => prev + amount);
    toast.success(`₹${amount} added to your wallet successfully!`);
    setAddAmount('');
  };

  const handleCustomAdd = () => {
    const amount = parseInt(addAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount < 10) {
      toast.error('Minimum amount is ₹10');
      return;
    }
    
    if (amount > 10000) {
      toast.error('Maximum amount is ₹10,000 per transaction');
      return;
    }
    
    handleAddMoney(amount);
  };

  const handleVerification = () => {
    // Simulate verification process
    toast.loading('Verifying your account...');
    
    setTimeout(() => {
      setIsVerified(true);
      setBalance(prev => prev + 100); // Welcome bonus
      toast.success('Account verified! ₹100 welcome bonus added to your wallet');
    }, 2000);
  };

  const canRentItems = balance >= 10; // Minimum balance required to rent

  // Give welcome bonus on first visit
  React.useEffect(() => {
    const hasReceivedBonus = localStorage.getItem('welcomeBonusReceived');
    if (!hasReceivedBonus && balance === 0) {
      setTimeout(() => {
        setBalance(100);
        localStorage.setItem('welcomeBonusReceived', 'true');
        toast.success('🎉 Welcome! ₹100 bonus added to your wallet!');
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <div className="ml-auto">
          {isVerified ? (
            <Badge variant="default" className="bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              <AlertCircle className="w-3 h-3 mr-1" />
              Unverified
            </Badge>
          )}
        </div>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-800">Account Verification Required</h3>
                <p className="text-sm text-orange-600">Verify your account to add money and unlock all features</p>
              </div>
              <Button onClick={handleVerification} size="sm" className="bg-orange-600 hover:bg-orange-700">
                Verify Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallet Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">₹{balance}</h2>
              <p className="text-sm text-blue-200 mt-1">
                {canRentItems ? '✓ Ready to rent items' : '⚠️ Add money to rent items'}
              </p>
            </div>
            <Wallet className="w-12 h-12 text-blue-200" />
          </div>
          <div className="mt-4 flex gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-purple-600"
              disabled={!isVerified}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => navigate('/spin-wheel')}
            >
              <Gift className="w-4 h-4 mr-2" />
              Spin & Win
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="add-money" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add-money">Add Money</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Add Money Tab */}
        <TabsContent value="add-money" className="space-y-4">
          {/* Quick Add Amounts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Add</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => handleAddMoney(amount)}
                    className="h-12"
                    disabled={!isVerified}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
              {!isVerified && (
                <p className="text-sm text-muted-foreground text-center">
                  Please verify your account to add money
                </p>
              )}
            </CardContent>
          </Card>

          {/* Custom Amount */}
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter amount (₹10 - ₹10,000)"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="flex-1"
                  min="10"
                  max="10000"
                  disabled={!isVerified}
                />
                <Button 
                  onClick={handleCustomAdd}
                  disabled={!addAmount || !isVerified}
                >
                  Add Money
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                disabled={!isVerified}
                onClick={() => toast.success('UPI payment integration coming soon!')}
              >
                <Smartphone className="w-5 h-5 mr-3" />
                UPI Payment (GPay, PhonePe, Paytm)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                disabled={!isVerified}
                onClick={() => toast.success('Card payment integration coming soon!')}
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Credit/Debit Card
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                disabled={!isVerified}
                onClick={() => toast.success('Net banking integration coming soon!')}
              >
                <Wallet className="w-5 h-5 mr-3" />
                Net Banking
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const Icon = transaction.icon;
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'credit' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </p>
                        <Badge variant={transaction.type === 'credit' ? 'default' : 'secondary'} className="text-xs">
                          {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletPage;
