import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';
import { menuItems } from '@/lib/data';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  
  const isMobile = window.innerWidth < 768;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getIconColor = () => {
    if (isScrolled || location.pathname !== '/') {
      return '#1a1a1a';
    }
    return '#ffffff';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || location.pathname !== '/' 
          ? "bg-white shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#f26841] flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <span 
              className="text-xl font-bold transition-colors"
              style={{ color: getIconColor() }}
            >
              Zappy
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {isLoggedIn && (
                <Link 
                  to="/orders" 
                  className={cn(
                    "transition-colors",
                    location.pathname === '/orders' 
                      ? "text-[#f26841] font-medium" 
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  My Orders
                </Link>
              )}
            </nav>
          )}
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[200px] h-8 text-sm rounded-full pr-8 pl-8 border-gray-200"
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full py-0 mx-[12px] my-[2px] font-bold bg-transparent transition-colors"
                  style={{ color: getIconColor() }}
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>
            
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
              style={{ color: getIconColor() }}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-[#f26841] text-white rounded-full">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
            
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                style={{ color: getIconColor() }}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            ) : (
              <Button 
                asChild 
                variant="ghost" 
                className="hover:bg-white/10 rounded-full transition-colors"
                style={{ color: getIconColor() }}
              >
                <Link to="/login" state={{ from: location }} className="flex items-center space-x-1">
                  <User className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only">Sign In</span>
                </Link>
              </Button>
            )}

            {/* Mobile Menu */}
            {isMobile && <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-white/10 rounded-full md:hidden transition-colors"
                  style={{ color: getIconColor() }}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] pt-12 bg-[#f8f8f8] border-l border-gray-200">
                <nav className="flex flex-col space-y-4">
                  {isLoggedIn && (
                    <Link to="/orders" className={cn("py-2 px-4 rounded-md transition-colors", location.pathname === "/orders" ? "bg-[#f26841]/10 text-[#f26841] font-medium" : "text-foreground/70 hover:bg-gray-100")}>
                      My Orders
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
