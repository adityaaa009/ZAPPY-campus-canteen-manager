
import React from 'react';
import { CheckCircle2, Clock, CookingPot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: <Clock className="h-4 w-4 mr-2 text-amber-500" />,
          label: 'Pending'
        };
      case 'preparing':
        return {
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <CookingPot className="h-4 w-4 mr-2 text-blue-500" />,
          label: 'Preparing'
        };
      case 'ready':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />,
          label: 'Ready for Pickup'
        };
      default:
        return {
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Clock className="h-4 w-4 mr-2 text-gray-500" />,
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium",
        config.bgColor,
        config.borderColor,
        config.color,
        className
      )}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

export default OrderStatusBadge;
