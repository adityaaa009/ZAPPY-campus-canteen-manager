
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import FeaturedItem from '@/components/FeaturedItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { menuItems } from '@/lib/data';
import { MenuItem as MenuItemType } from '@/types';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  
  // Filter and categorize menu items
  const categories = ['all', 'breakfast', 'lunch', 'snacks', 'drinks'];
  
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getCategoryItems = (category: string) => {
    if (category === 'all') return filteredItems;
    return filteredItems.filter(item => item.category === category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our delicious offerings from breakfast to snacks, all prepared fresh in our campus canteen.
            </p>
          </div>
          
          {/* Search Bar and Cart Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu items..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button asChild variant="outline" className="space-x-2">
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-12">
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-auto">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getCategoryItems(category).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <FeaturedItem item={item} />
                    </motion.div>
                  ))}
                </div>
                
                {getCategoryItems(category).length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No items found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
