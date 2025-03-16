
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from '@/lib/data';
import { CartItem as CartItemType } from '@/types';

// Mock cart data for demo
const initialCartItems: CartItemType[] = [
  { ...menuItems[0], quantity: 2 },
  { ...menuItems[3], quantity: 1 },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const increaseQuantity = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  const decreaseQuantity = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const handleCheckout = () => {
    // In a real app, we would handle the checkout process here
    toast({
      title: "Order Placed Successfully!",
      description: "You can track your order status in the orders page.",
      duration: 3000,
    });
    navigate('/orders');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/menu" 
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Menu
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
            <p className="text-gray-600">Review and modify your order before checkout.</p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <AnimatePresence>
                    {cartItems.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-soft p-6 sticky top-24"
                >
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Tax</span>
                      <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{(totalAmount * 1.05).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    By placing your order, you agree to our terms of service and privacy policy.
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild>
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
