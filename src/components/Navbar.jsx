import React, { useContext, useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  Close,
  WhatsApp,
  Home,
  Store,
  ShoppingBag,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Store },
    { path: '/cart', label: 'Cart', icon: ShoppingBag },

  ];

  return (
    <>
      <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-white shadow-md'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">

            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-2 text-2xl lg:text-3xl font-bold text-gray-800 tracking-wide transition-all duration-300"
              onClick={closeMenu}
            >
              <div className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Glow
                </span>
                <span className="text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  Time
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600"
                  onClick={closeMenu}
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <item.icon className="w-5 h-5" />
                      {item.path === '/cart' && cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Cart Icon (visible on all devices) */}
              <Link
                to="/cart"
                className="relative md:hidden group p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-full"
                onClick={closeMenu}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>


              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918248794519?text=Hi%20GlowTime%2C%20can%20we%20have%20a%20quick%20chat%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-full text-sm lg:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <WhatsApp className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">Contact Now</span>
                  <span className="sm:hidden">Contact</span>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>


              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="menu-button lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-full"
              >
                {isMenuOpen ? <Close className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={closeMenu}></div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu  fixed top-0 right-0 h-screen  w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="text-xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Glow</span>
                <span className="text-gray-800">Time</span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:bg-blue-50 rounded-full"
              >
                <Close className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 py-6">
              <div className="space-y-2 px-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className="group flex items-center space-x-4 px-4 py-4 text-gray-700 font-medium rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.label}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="text-center text-gray-500 text-sm">
                <p>© 2024 GlowTime</p>
                <p>Made with<FavoriteIcon sx={{ color: "red", marginX: "4px" }}
                />for beauty</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;
