
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface FeaturedItemProps {
  item: MenuItem;
  className?: string;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({ item, className }) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    // Convert MenuItem to CartItem by adding the quantity property
    const cartItem = {
      ...item,
      quantity: 1
    };
    
    addItem(cartItem);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-soft hover:shadow-soft-hover transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img 
          src={imageError ? '/placeholder.svg' : item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {item.availability < 5 && item.availability > 0 && (
          <div className="absolute top-2 left-2 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            Only {item.availability} left
          </div>
        )}
        
        {item.availability === 0 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-medium text-lg">Out of Stock</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#f26841] font-semibold">
          ₹{item.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 h-10">
          {item.description}
        </p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 capitalize">
            {item.category}
          </span>
          
          <Button 
            size="sm" 
            className="rounded-full bg-[#f26841] hover:bg-[#f26841]/90 text-white"
            disabled={item.availability === 0}
            onClick={handleAddToCart}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedItem;
