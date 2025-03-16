
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center py-4 border-b border-gray-200 last:border-0"
    >
      <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-end sm:items-center ml-4">
        <div className="flex items-center mb-2 sm:mb-0 sm:mr-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full border-gray-300"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center">{item.quantity}</span>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full border-gray-300"
            onClick={() => onIncrease(item.id)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="text-right">
          <div className="font-medium mb-1">₹{(item.price * item.quantity).toFixed(2)}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            <span className="text-xs">Remove</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
