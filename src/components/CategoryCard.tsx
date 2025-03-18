import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  image: string;
  title: string;
  link: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  image, 
  title, 
  link,
  className
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative group overflow-hidden rounded-2xl shadow-soft transition-all duration-300",
        className
      )}
    >
      <Link to={link} className="block">
        <div className="aspect-square overflow-hidden rounded-2xl">
          <img 
            src={imageError ? '/placeholder.svg' : image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h3 className="text-xl md:text-2xl font-semibold text-white">{title}</h3>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
            View {title}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
