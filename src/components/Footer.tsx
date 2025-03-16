
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Rss, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-canteen-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
                Campus Cuisine Hub
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">
              University College of Engineering's canteen management system for quick and efficient food ordering.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4 text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4 text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="RSS">
                <Rss className="h-4 w-4 text-gray-600" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-600 hover:text-primary transition-colors">Menu</Link></li>
              <li><Link to="/orders" className="text-gray-600 hover:text-primary transition-colors">My Orders</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Important Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Information</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <p className="text-gray-700 font-medium">Address:</p>
                <p>University College of Engineering Muttom</p>
              </li>
              <li>
                <p className="text-gray-700 font-medium">Hours:</p>
                <p>Mon-Fri 8am-5pm</p>
              </li>
              <li>
                <p className="text-gray-700 font-medium">Phone:</p>
                <p>+91 9876543210</p>
              </li>
              <li>
                <p className="text-gray-700 font-medium">Email:</p>
                <p>canteen@uce.edu</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} University College of Engineering Canteen. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-500 hover:text-gray-700 text-sm">Terms</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-gray-700 text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
