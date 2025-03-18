import { User, MenuItem, Order, Notification, DailySales, OrderStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'john@university.edu',
    role: 'customer',
    phone: '555-123-4567',
    profilePic: 'https://ui-avatars.com/api/?name=John+Student&background=random'
  },
  {
    id: '2',
    name: 'Campus Canteen',
    email: 'canteen@university.edu',
    role: 'vendor',
    phone: '555-987-6543',
    profilePic: 'https://ui-avatars.com/api/?name=Campus+Canteen&background=random'
  }
];

// Mock Menu Items
export const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: '1',
    name: 'Idli Sambar',
    price: 45,
    availability: 20,
    imageUrl: '/Menu Items/Idli Sambhar.jpeg',
    category: 'breakfast',
    vendorId: '2',
    description: 'Soft rice cakes served with lentil stew and coconut chutney'
  },
  {
    id: '2',
    name: 'Masala Dosa',
    price: 50,
    availability: 15,
    imageUrl: '/Menu Items/Masala Dosa.jpeg',
    category: 'breakfast',
    vendorId: '2',
    description: 'Crispy rice pancake filled with spiced potato filling'
  },
  {
    id: '3',
    name: 'Poha',
    price: 30,
    availability: 25,
    imageUrl: '/Menu Items/Poha.jpeg',
    category: 'breakfast',
    vendorId: '2',
    description: 'Flattened rice with onions, peanuts, and spices'
  },
  
  // Lunch Items
  {
    id: '4',
    name: 'Thali',
    price: 75,
    availability: 10,
    imageUrl: '/Menu Items/Thali.jpeg',
    category: 'lunch',
    vendorId: '2',
    description: 'Complete meal with rice, dal, curry, yogurt, and sides'
  },
  {
    id: '5',
    name: 'Biryani',
    price: 85,
    availability: 8,
    imageUrl: '/Menu Items/Biryani.jpeg',
    category: 'lunch',
    vendorId: '2',
    description: 'Fragrant rice dish with tender meat and aromatic spices'
  },
  {
    id: '6',
    name: 'Chole Bhature',
    price: 65,
    availability: 12,
    imageUrl: '/Menu Items/Chole Bhature.jpeg',
    category: 'lunch',
    vendorId: '2',
    description: 'Spiced chickpea curry with fried bread'
  },
  
  // Snacks
  {
    id: '7',
    name: 'Samosa',
    price: 20,
    availability: 30,
    imageUrl: '/Menu Items/Samosa.jpeg',
    category: 'snacks',
    vendorId: '2',
    description: 'Crispy pastry filled with spiced potatoes and peas'
  },
  {
    id: '8',
    name: 'Vada Pav',
    price: 25,
    availability: 25,
    imageUrl: '/Menu Items/Vada Pav.jpeg',
    category: 'snacks',
    vendorId: '2',
    description: 'Spiced potato fritter in a bun with chutneys'
  },
  {
    id: '9',
    name: 'Vegetable Cutlets',
    price: 12.50,
    availability: 20,
    imageUrl: '/Menu Items/Vegetable Cutlets.jpeg',
    category: 'snacks',
    vendorId: '2',
    description: 'Mixed vegetable patties with spices, crispy fried'
  },
  
  // Drinks
  {
    id: '10',
    name: 'Masala Chai',
    price: 15,
    availability: 40,
    imageUrl: '/Menu Items/Masala Chai.jpeg',
    category: 'drinks',
    vendorId: '2',
    description: 'Spiced tea with milk'
  },
  {
    id: '11',
    name: 'Cold Coffee',
    price: 35,
    availability: 30,
    imageUrl: '/Menu Items/Soft Drinks.jpeg',
    category: 'drinks',
    vendorId: '2',
    description: 'Chilled coffee with milk and sugar'
  },
  {
    id: '12',
    name: 'Soft Drinks',
    price: 25,
    availability: 50,
    imageUrl: '/Menu Items/Soft Drinks.jpeg',
    category: 'drinks',
    vendorId: '2',
    description: 'Various branded soft drinks'
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    id: '1',
    customerId: '1',
    items: [
      { itemId: '1', name: 'Idli Sambar', price: 45, quantity: 2 },
      { itemId: '10', name: 'Masala Chai', price: 15, quantity: 1 }
    ],
    totalPrice: 105,
    status: 'ready',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    vendorId: '2'
  },
  {
    id: '2',
    customerId: '1',
    items: [
      { itemId: '4', name: 'Thali', price: 75, quantity: 1 },
      { itemId: '12', name: 'Soft Drinks', price: 25, quantity: 1 }
    ],
    totalPrice: 100,
    status: 'preparing',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    vendorId: '2'
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    message: 'Your order #1 is ready for pickup!',
    orderId: '1',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    status: 'unread'
  },
  {
    id: '2',
    userId: '1',
    message: 'Your order #2 is being prepared.',
    orderId: '2',
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    status: 'read'
  }
];

// Mock Sales Data
export const salesData: DailySales[] = [
  {
    vendorId: '2',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    totalSales: 3560,
    totalOrders: 42
  },
  {
    vendorId: '2',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Day before yesterday
    totalSales: 2980,
    totalOrders: 35
  }
];

// Helper function to generate a new order
export const createOrder = (customerId: string, items: any[], vendorId: string) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return {
    id: uuidv4(),
    customerId,
    items,
    totalPrice,
    status: 'pending' as OrderStatus,
    timestamp: new Date(),
    vendorId
  };
};
