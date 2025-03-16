
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
  phone?: string;
  profilePic?: string;
}

// Menu types
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  availability: number;
  imageUrl: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'drinks';
  vendorId: string;
  description?: string;
}

// Cart types
export interface CartItem extends MenuItem {
  quantity: number;
}

// Order types
export type OrderStatus = 'pending' | 'preparing' | 'ready';

export interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  timestamp: Date;
  vendorId: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  orderId?: string;
  timestamp: Date;
  status: 'unread' | 'read';
}

// Analytics types
export interface DailySales {
  vendorId: string;
  date: Date;
  totalSales: number;
  totalOrders: number;
}
