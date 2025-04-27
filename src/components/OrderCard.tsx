
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Check, CookingPot, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Order, OrderStatus } from '@/types';
import OrderStatus from '@/components/OrderStatus';

interface OrderCardProps {
  order: Order;
  onUpdateStatus?: (orderId: string, newStatus: OrderStatus) => void;
  isVendorView?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onUpdateStatus,
  isVendorView = false
}) => {
  const handleStatusUpdate = (newStatus: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id, newStatus);
    }
  };
  
  const getNextStatus = (): OrderStatus | null => {
    switch (order.status) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      default:
        return null;
    }
  };
  
  const getStatusIcon = () => {
    switch (order.status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <CookingPot className="h-4 w-4" />;
      case 'ready':
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getStatusActionText = (): string => {
    switch (order.status) {
      case 'pending':
        return 'Start Preparing';
      case 'preparing':
        return 'Mark as Ready';
      default:
        return '';
    }
  };
  
  const nextStatus = getNextStatus();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Order #{order.id}
            </CardTitle>
            <OrderStatus status={order.status} />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Ordered on {format(new Date(order.timestamp), 'PPp')}
              </p>
            </div>
            
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div key={index} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t border-dashed">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        {isVendorView && nextStatus && onUpdateStatus && (
          <CardFooter className="border-t bg-gray-50 p-4">
            <Button 
              onClick={() => handleStatusUpdate(nextStatus)}
              className="w-full"
              variant={order.status === 'pending' ? 'outline' : 'default'}
            >
              {getStatusIcon()}
              <span className="ml-2">{getStatusActionText()}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default OrderCard;
