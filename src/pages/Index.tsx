import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import FeaturedItem from '@/components/FeaturedItem';
import Footer from '@/components/Footer';
import { menuItems } from '@/lib/data';

const Index = () => {
  const categories = [
    {
      image: '/Menu Items/Breakfast.jpeg',
      title: 'Breakfast',
      link: '/menu?category=breakfast'
    },
    {
      image: '/Menu Items/Lunch.jpeg',
      title: 'Lunch',
      link: '/menu?category=lunch'
    },
    {
      image: '/Menu Items/Snacks.jpeg',
      title: 'Snacks',
      link: '/menu?category=snacks'
    },
    {
      image: '/Menu Items/Soft Drinks.jpeg',
      title: 'Soft Drinks',
      link: '/menu?category=drinks'
    }
  ];

  const featuredItems = menuItems.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of delicious meals and snacks, freshly prepared in our campus canteen.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Items Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Weekly Featured Food</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Try our most popular dishes, carefully selected for your enjoyment.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeaturedItem item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Order your favorite meals in just a few simple steps.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Browse Menu",
                description: "Explore our wide selection of meals and snacks."
              },
              {
                icon: "🛒",
                title: "Place Order",
                description: "Add items to cart and confirm your order."
              },
              {
                icon: "✨",
                title: "Pick Up",
                description: "Get notified when your order is ready for pickup."
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-soft"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the convenience of our digital canteen service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "No More Queues",
                description: "Save time by ordering ahead and skipping the long lines."
              },
              {
                title: "Real-time Updates",
                description: "Get instant notifications about your order status."
              },
              {
                title: "Fresh Food",
                description: "All meals are prepared fresh when you order."
              },
              {
                title: "Easy Payment",
                description: "Multiple payment options for your convenience."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-soft text-center hover:shadow-soft-hover transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
