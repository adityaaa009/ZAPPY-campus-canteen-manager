
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check auth state
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUser(session?.user || null);
    });
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled 
          ? "py-2 bg-glass shadow-soft backdrop-blur-md border-b border-gray-200/50" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f26841] text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform -rotate-12"
            >
              <path
                d="M13 3L4 14H13L11 21L20 10H11L13 3Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-[#f26841] to-[#f26841]/80 bg-clip-text text-transparent">
            Zappy
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link to="/cart" className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>
          
          {isLoggedIn ? (
            <Link to="/profile" className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          ) : (
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 rounded-full">
              <Link to="/login" className="flex items-center space-x-1">
                <User className="h-5 w-5" />
                <span className="sr-only md:not-sr-only">Sign In</span>
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] pt-12 bg-[#f8f8f8] border-l border-gray-200">
                <nav className="flex flex-col space-y-4">
                  {isLoggedIn && (
                    <>
                      <Link
                        to="/"
                        className={cn(
                          "py-2 px-4 rounded-md transition-colors",
                          location.pathname === "/" 
                            ? "bg-[#f26841]/10 text-[#f26841] font-medium" 
                            : "text-foreground/70 hover:bg-gray-100"
                        )}
                      >
                        Home
                      </Link>
                      <Link
                        to="/orders"
                        className={cn(
                          "py-2 px-4 rounded-md transition-colors",
                          location.pathname === "/orders" 
                            ? "bg-[#f26841]/10 text-[#f26841] font-medium" 
                            : "text-foreground/70 hover:bg-gray-100"
                        )}
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
