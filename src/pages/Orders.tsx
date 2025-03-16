
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Clock, CheckCircle2, Package } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login');
        toast({
          title: "Authentication required",
          description: "Please log in to view your orders",
          variant: "destructive"
        });
      } else {
        fetchOrders(data.session.user.id);
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchOrders = async (userId: string) => {
    setLoading(true);
    try {
      // For demo purposes using static data
      // In a real app, you would fetch from Supabase like:
      // const { data, error } = await supabase
      //   .from('orders')
      //   .select('*')
      //   .eq('customerId', userId)
      //   .order('timestamp', { ascending: false });
      
      // Sample data for demonstration
      const mockOrders: Order[] = [
        {
          id: '1',
          customerId: userId,
          vendorId: 'v1',
          status: 'ready',
          totalPrice: 350,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          items: [
            { itemId: 'i1', name: 'Veg Pasta', price: 180, quantity: 1 },
            { itemId: 'i2', name: 'Garlic Bread', price: 120, quantity: 1 },
            { itemId: 'i3', name: 'Cold Coffee', price: 50, quantity: 1 }
          ]
        },
        {
          id: '2',
          customerId: userId,
          vendorId: 'v2',
          status: 'ready',
          totalPrice: 200,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          items: [
            { itemId: 'i4', name: 'Vegetable Sandwich', price: 80, quantity: 1 },
            { itemId: 'i5', name: 'French Fries', price: 70, quantity: 1 },
            { itemId: 'i6', name: 'Iced Tea', price: 50, quantity: 1 }
          ]
        },
        {
          id: '3',
          customerId: userId,
          vendorId: 'v1',
          status: 'ready',
          totalPrice: 450,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          items: [
            { itemId: 'i7', name: 'Cheese Pizza', price: 250, quantity: 1 },
            { itemId: 'i8', name: 'Pasta Salad', price: 150, quantity: 1 },
            { itemId: 'i9', name: 'Sprite', price: 50, quantity: 1 }
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'preparing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.map(order => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <CardDescription>
                              {formatDistanceToNow(order.timestamp, { addSuffix: true })}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                            {getStatusIcon(order.status)}
                            <span>Completed</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mt-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.quantity} × {item.name}</span>
                              <span>₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </span>
                        <span className="font-semibold">
                          Total: ₹{order.totalPrice}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent">
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.slice(0, 2).map(order => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <CardDescription>
                              {formatDistanceToNow(order.timestamp, { addSuffix: true })}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                            {getStatusIcon(order.status)}
                            <span>Completed</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mt-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.quantity} × {item.name}</span>
                              <span>₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </span>
                        <span className="font-semibold">
                          Total: ₹{order.totalPrice}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No recent orders</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders recently.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
