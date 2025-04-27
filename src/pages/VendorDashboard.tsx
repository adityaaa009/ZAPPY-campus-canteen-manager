
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import VendorNavbar from '@/components/VendorNavbar';
import OrderCard from '@/components/OrderCard';
import { orders } from '@/lib/data';
import { Order, OrderStatus } from '@/types';
import VendorStats from '@/components/VendorStats';

const VendorDashboard: React.FC = () => {
  const [vendorSession, setVendorSession] = useState<{id: string, name: string} | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for vendor session
    const sessionData = localStorage.getItem('vendorSession');
    if (!sessionData) {
      navigate('/vendor/login');
      return;
    }
    
    setVendorSession(JSON.parse(sessionData));
    
    // Filter orders for this vendor
    const vendorId = JSON.parse(sessionData).id;
    const vendorOrders = orders.filter(order => order.vendorId === vendorId);
    
    setActiveOrders(vendorOrders.filter(order => order.status !== 'ready'));
    setCompletedOrders(vendorOrders.filter(order => order.status === 'ready'));
  }, [navigate]);
  
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would be an API call to update the order status
    
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
            {activeOrders.length > 0 ? (
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
            {completedOrders.length > 0 ? (
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
              <div className="text-center py-8">
                <p className="text-primary">Inventory management features coming soon!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
