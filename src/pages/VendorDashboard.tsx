
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import VendorNavbar from '@/components/VendorNavbar';
import OrderCard from '@/components/OrderCard';
import { orders } from '@/lib/data';
import { Order, OrderStatus } from '@/types';
import VendorStats from '@/components/VendorStats';
import { useToast } from '@/components/ui/use-toast';

const VendorDashboard: React.FC = () => {
  const [vendorSession, setVendorSession] = useState<{id: string, name: string} | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for vendor session
    const sessionData = localStorage.getItem('vendorSession');
    if (!sessionData) {
      navigate('/vendor/login');
      return;
    }
    
    setVendorSession(JSON.parse(sessionData));
    
    // Simulate fetching real-time orders from a database
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call to fetch orders
        // For now, we're using the mock data but simulating a network request
        setTimeout(() => {
          const vendorId = JSON.parse(sessionData).id;
          
          // Create a few more realistic orders for today based on our sample menu items
          const today = new Date();
          const todayOrders = [
            ...orders,
            {
              id: '3',
              customerId: '1',
              items: [
                { itemId: '2', name: 'Masala Dosa', price: 50, quantity: 2 },
                { itemId: '3', name: 'Poha', price: 30, quantity: 1 }
              ],
              totalPrice: 130,
              status: 'pending' as OrderStatus,
              timestamp: new Date(today.setMinutes(today.getMinutes() - 5)),
              vendorId: '2'
            },
            {
              id: '4',
              customerId: '1',
              items: [
                { itemId: '5', name: 'Biryani', price: 85, quantity: 1 },
                { itemId: '8', name: 'Vada Pav', price: 25, quantity: 2 }
              ],
              totalPrice: 135,
              status: 'pending' as OrderStatus,
              timestamp: new Date(today.setMinutes(today.getMinutes() - 3)),
              vendorId: '2'
            }
          ];
          
          const vendorOrders = todayOrders.filter(order => order.vendorId === vendorId);
          
          setActiveOrders(vendorOrders.filter(order => order.status !== 'ready'));
          setCompletedOrders(vendorOrders.filter(order => order.status === 'ready'));
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Error Loading Orders",
          description: "Failed to load the latest orders. Please refresh.",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
      }
    };
    
    fetchOrders();
    
    // Set up an interval to refresh orders every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchOrders();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [navigate, toast]);
  
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would be an API call to update the order status
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} has been updated to ${newStatus}`,
      duration: 3000,
    });
    
    // Update active orders list
    setActiveOrders(prev => 
      prev.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
    
    // If the order is now complete, move it to completed orders
    if (newStatus === 'ready') {
      const orderToMove = activeOrders.find(order => order.id === orderId);
      if (orderToMove) {
        const updatedOrder = { ...orderToMove, status: newStatus };
        setActiveOrders(prev => prev.filter(o => o.id !== orderId));
        setCompletedOrders(prev => [updatedOrder, ...prev]);
      }
    }
  };

  if (!vendorSession) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <VendorNavbar vendorName={vendorSession.name} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage your orders and inventory</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <VendorStats 
            totalOrders={activeOrders.length + completedOrders.length}
            pendingOrders={activeOrders.filter(o => o.status === 'pending').length}
            preparingOrders={activeOrders.filter(o => o.status === 'preparing').length}
            completedOrders={completedOrders.length}
          />
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active Orders 
              {activeOrders.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mb-2"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <p className="mt-4 text-gray-500">Loading orders...</p>
                </div>
              </div>
            ) : activeOrders.length > 0 ? (
              activeOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdateStatus={updateOrderStatus}
                  isVendorView={true}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No active orders</h3>
                <p className="mt-1 text-gray-500">
                  When customers place orders, they will appear here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mb-2"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <p className="mt-4 text-gray-500">Loading completed orders...</p>
                </div>
              </div>
            ) : completedOrders.length > 0 ? (
              completedOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  isVendorView={true}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No completed orders today</h3>
                <p className="mt-1 text-gray-500">
                  Completed orders will be shown here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Inventory & Menu Items</h3>
              <p className="text-gray-500 mb-4">
                Update item availability and manage your menu offerings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Quick Update</h4>
                  <p className="text-sm text-gray-500 mb-4">Mark items as out of stock or update availability</p>
                  <Button variant="outline" disabled>Coming Soon</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Add New Items</h4>
                  <p className="text-sm text-gray-500 mb-4">Create new menu items for your customers</p>
                  <Button variant="outline" disabled>Coming Soon</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
