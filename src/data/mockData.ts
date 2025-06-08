
export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg",
  city: "Mumbai",
  rating: 4.8,
  reviewCount: 24,
  itemsListed: 12,
  itemsRented: 8
};

export const mockItems = [
  {
    id: "1",
    title: "Canon EOS R5 Camera",
    description: "Professional mirrorless camera with 45MP sensor. Perfect for photography and videography projects.",
    price: 1500,
    category: "Photography",
    owner: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg",
      rating: 4.9
    },
    location: "Bandra, Mumbai",
    images: ["/placeholder.svg"],
    isAvailable: true
  },
  {
    id: "2",
    title: "MacBook Pro M2",
    description: "Latest MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Great for development and creative work.",
    price: 2000,
    category: "Electronics",
    owner: {
      name: "Priya Patel",
      avatar: "/placeholder.svg",
      rating: 4.7
    },
    location: "Andheri, Mumbai",
    images: ["/placeholder.svg"],
    isAvailable: true
  },
  {
    id: "3",
    title: "PlayStation 5",
    description: "Sony PS5 console with controller and popular games. Perfect for gaming enthusiasts.",
    price: 800,
    category: "Gaming",
    owner: {
      name: "Amit Kumar",
      avatar: "/placeholder.svg",
      rating: 4.6
    },
    location: "Powai, Mumbai",
    images: ["/placeholder.svg"],
    isAvailable: false
  },
  {
    id: "4",
    title: "Royal Enfield Classic 350",
    description: "Well-maintained bike perfect for city rides and short trips. Full tank included.",
    price: 1200,
    category: "Vehicles",
    owner: {
      name: "Vikash Singh",
      avatar: "/placeholder.svg",
      rating: 4.8
    },
    location: "Malad, Mumbai",
    images: ["/placeholder.svg"],
    isAvailable: true
  },
  {
    id: "5",
    title: "Power Drill Set",
    description: "Complete power drill set with various bits and accessories. Great for home improvement projects.",
    price: 300,
    category: "Tools",
    owner: {
      name: "Suresh Gupta",
      avatar: "/placeholder.svg",
      rating: 4.5
    },
    location: "Thane, Mumbai",
    images: ["/placeholder.svg"],
    isAvailable: true
  }
];

export const mockMessages = [
  {
    id: "1",
    user: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg",
      lastSeen: "2 min ago"
    },
    lastMessage: "Camera is available for tomorrow. What time works for you?",
    timestamp: "2:30 PM",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: "2",
    user: {
      name: "Priya Patel",
      avatar: "/placeholder.svg",
      lastSeen: "1 hour ago"
    },
    lastMessage: "Thanks for renting the MacBook! Hope it helps with your project.",
    timestamp: "1:15 PM",
    unreadCount: 0,
    isOnline: false
  },
  {
    id: "3",
    user: {
      name: "Amit Kumar",
      avatar: "/placeholder.svg",
      lastSeen: "5 min ago"
    },
    lastMessage: "PS5 return date confirmed for Sunday evening.",
    timestamp: "11:45 AM",
    unreadCount: 1,
    isOnline: true
  }
];
