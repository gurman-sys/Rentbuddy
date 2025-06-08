
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
}

const WalletCard: React.FC = () => {
  const [balance, setBalance] = useState(250);
  const [addAmount, setAddAmount] = useState('');
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 100,
      description: 'Spin wheel reward',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      type: 'debit',
      amount: 50,
      description: 'Camera rental payment',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      type: 'credit',
      amount: 200,
      description: 'Added via UPI',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    }
  ]);

  const handleAddMoney = () => {
    const amount = parseInt(addAmount);
    if (amount && amount > 0) {
      setBalance(prev => prev + amount);
      setAddAmount('');
      toast.success(`₹${amount} added to wallet successfully!`);
    }
  };

  const paymentMethods = [
    { name: 'UPI', icon: '📱', color: 'bg-green-100 text-green-700' },
    { name: 'Paytm', icon: '💰', color: 'bg-blue-100 text-blue-700' },
    { name: 'Card', icon: '💳', color: 'bg-purple-100 text-purple-700' },
    { name: 'Net Banking', icon: '🏦', color: 'bg-orange-100 text-orange-700' }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-600" />
          My Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Balance Display */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
          <p className="text-sm opacity-90">Available Balance</p>
          <p className="text-3xl font-bold">₹{balance}</p>
        </div>

        {/* Add Money Section */}
        <div className="space-y-3">
          <h4 className="font-medium">Add Money</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddMoney} disabled={!addAmount}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          
          {/* Quick Add Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[100, 200, 500, 1000].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setAddAmount(amount.toString())}
                className="text-xs"
              >
                ₹{amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Payment Methods</h4>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((method) => (
              <Badge
                key={method.name}
                variant="outline"
                className={`${method.color} justify-center p-2 cursor-pointer hover:opacity-80`}
              >
                <span className="mr-1">{method.icon}</span>
                {method.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Transactions</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {transactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className="truncate">{transaction.description}</span>
                </div>
                <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
