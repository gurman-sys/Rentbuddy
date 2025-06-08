
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  city: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  dailyRate: number;
  securityDeposit?: number;
  images: string[];
  owner: User;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  availability: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface RentalRequest {
  id: string;
  item: Item;
  renter: User;
  startDate: string;
  endDate: string;
  totalAmount: number;
  appFee: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  itemId?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
