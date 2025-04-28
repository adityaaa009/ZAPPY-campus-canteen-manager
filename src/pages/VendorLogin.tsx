
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { users } from '@/lib/data';

const VendorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Enhanced vendor authentication with specific credentials
    const vendor = users.find(u => u.email === email && u.role === 'vendor');
    
    // Check for specific vendor email and password
    const isValidCredentials = 
      email === "canteen@university.edu" && 
      password === "campus123";
    
    setTimeout(() => {
      if (vendor && isValidCredentials) {
        toast({
          title: "Vendor Login Successful",
          description: `Welcome back, ${vendor.name}!`,
          duration: 3000,
        });
        
        // Store vendor session info with more details
        localStorage.setItem('vendorSession', JSON.stringify({ 
          id: vendor.id, 
          name: vendor.name,
          email: vendor.email,
          loginTime: new Date().toISOString()
        }));
        
        navigate('/vendor/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid vendor credentials. Please check your email and password.",
          variant: "destructive",
          duration: 3000,
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/">
            <h2 className="text-3xl font-extrabold text-[#f26841]">
              ZAPPY <span className="text-gray-700">Vendor Portal</span>
            </h2>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Manage your canteen orders efficiently
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white shadow-soft rounded-xl overflow-hidden p-6"
        >
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Vendor Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="canteen@university.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: canteen@university.edu</p>
              <p>Password: campus123</p>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In as Vendor'}
              </Button>
            </div>
            
            <div className="text-center pt-4">
              <Link to="/login" className="text-sm text-primary hover:text-primary/80">
                Sign in as Customer instead
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorLogin;
