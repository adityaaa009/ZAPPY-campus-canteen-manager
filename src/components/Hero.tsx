
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn(
      "relative h-screen flex items-center justify-center overflow-hidden",
      className
    )}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10">
        <img
          src="/lovable-uploads/ad487a16-92b4-413d-bd6b-78d322599920.png"
          alt="Zappy Food Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block py-1 px-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
            DELICIOUS FOOD, LIGHTNING-FAST SERVICE
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight flex justify-center items-center gap-4"
        >
          <Zap className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-accent" />
          <span>Zappy</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-8 text-white/80 text-lg"
        >
          <p>Your Food, Faster than a Flash!</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white px-10 py-6 shadow-lg shadow-accent/30">
            <Link to="/menu" className="flex items-center gap-2">
              <span>Browse Menu</span>
              <Zap className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-1"
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 16] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
