
import React, { useState } from 'react';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface BookingModalProps {
  item: {
    id: string;
    title: string;
    price: number;
    owner: {
      name: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ item, isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [totalDays, setTotalDays] = useState(1);

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays || 1);
    }
  };

  React.useEffect(() => {
    calculateDays();
  }, [startDate, endDate]);

  const totalAmount = item.price * totalDays;

  const handleBooking = () => {
    toast.success(`Booking request sent for ${item.title}!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book {item.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    {startDate ? format(startDate, 'MMM dd') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    {endDate ? format(endDate, 'MMM dd') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">₹{item.price}/day × {totalDays} days</span>
              <span className="font-medium">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleBooking} className="flex-1">
              <CreditCard className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingModal;
