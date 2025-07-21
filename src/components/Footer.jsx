import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'react-feather';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="text-blue-500 mr-3" size={28} />
                <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Glow
                </span>
                <span className="text-2xl text-white group-hover:text-blue-600 transition-colors duration-300">
                  Time
                </span>
            </div>
            <p className="text-gray-400">
              Premium timepieces crafted with precision and passion. Elevate your style with our exquisite collection.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-blue-500 transition-colors">
                 Cart
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Time Avenue, Watch City, WC 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-500 mr-3" size={18} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-500 mr-3" size={18} />
                <span className="text-gray-400">info@glowtime.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} GlowTime Watches. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;