
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Menu, User, Bell, Zap } from 'lucide-react';
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

  // Navigation links based on auth state
  const getNavLinks = () => {
    const baseLinks = [
      { to: '/menu', label: 'Menu' }
    ];
    
    if (isLoggedIn) {
      return [
        { to: '/', label: 'Home' },
        ...baseLinks,
        { to: '/orders', label: 'My Orders' }
      ];
    }
    
    return baseLinks;
  };
  
  const navLinks = getNavLinks();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white">
            <Zap className="h-6 w-6 transform -rotate-12" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
            Zappy
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative font-medium transition-colors hover:text-accent",
                  isActive(link.to) 
                    ? "text-accent after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']" 
                    : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </Link>
              <Link to="/profile" className="relative">
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors">
                  <User className="h-5 w-5" />
                </div>
              </Link>
            </>
          ) : (
            <Button asChild variant="default" className="shadow-none rounded-full bg-accent hover:bg-accent/90">
              <Link to="/login">Log In</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] pt-12">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        "py-2 px-4 rounded-md transition-colors",
                        isActive(link.to) 
                          ? "bg-accent/10 text-accent font-medium" 
                          : "text-foreground/70 hover:bg-gray-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
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
