
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, X } from 'lucide-react';

interface AvailabilityCalendarProps {
  onDatesChange: (dates: Date[]) => void;
  blockedDates?: Date[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  onDatesChange,
  blockedDates = []
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dateString = date.toDateString();
    const isAlreadySelected = selectedDates.some(d => d.toDateString() === dateString);
    
    let newDates;
    if (isAlreadySelected) {
      newDates = selectedDates.filter(d => d.toDateString() !== dateString);
    } else {
      newDates = [...selectedDates, date];
    }
    
    setSelectedDates(newDates);
    onDatesChange(newDates);
  };

  const clearDates = () => {
    setSelectedDates([]);
    onDatesChange([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Availability Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Select dates when your item will be available for rent
          </p>
          {selectedDates.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearDates}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => {
            if (dates) {
              setSelectedDates(Array.isArray(dates) ? dates : [dates]);
              onDatesChange(Array.isArray(dates) ? dates : [dates]);
            }
          }}
          disabled={(date) => 
            date < new Date() || 
            blockedDates.some(blocked => blocked.toDateString() === date.toDateString())
          }
          className="rounded-md border"
        />
        
        {selectedDates.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Selected Dates ({selectedDates.length}):</p>
            <div className="flex flex-wrap gap-1">
              {selectedDates.slice(0, 5).map((date, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {date.toLocaleDateString()}
                </Badge>
              ))}
              {selectedDates.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedDates.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
