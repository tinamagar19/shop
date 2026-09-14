import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Heart, User, Menu } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const Navbar = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Offers', path: '/offers' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <ShoppingCart className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-base">ShopEase</span>
          </Link>

        
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-custom'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

       
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

         
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-base hover:text-primary transition-colors hidden sm:block cursor-pointer">
              <Heart className="w-6 h-6" />
            </button>
            
            
            <Link 
              to="/login" 
              className="flex items-center justify-center text-base hover:text-primary transition-colors hidden sm:flex cursor-pointer"
            >
              <User className="w-6 h-6" />
            </Link>
            
            <Link to="/cart" className="relative text-base hover:text-primary transition-colors flex items-center">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden text-base hover:text-primary flex items-center">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;