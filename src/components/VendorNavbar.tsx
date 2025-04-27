
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface VendorNavbarProps {
  vendorName: string;
}

const VendorNavbar: React.FC<VendorNavbarProps> = ({ vendorName }) => {
  const [notificationCount] = useState(2);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('vendorSession');
    navigate('/vendor/login');
  };

  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/vendor/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#f26841] flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Zappy</span>
              <span className="text-xs -mt-1 text-gray-500">Vendor Portal</span>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/vendor/notifications">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]" 
                    variant="outline"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-medium">
                  {vendorName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/vendor/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-12">
                <div className="flex flex-col space-y-4 pt-4">
                  <Link to="/vendor/notifications" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                    {notificationCount > 0 && (
                      <Badge className="ml-auto" variant="outline">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                  <Link to="/vendor/settings" className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorNavbar;
