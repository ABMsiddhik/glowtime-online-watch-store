import React, { useState,useEffect, useMemo, useContext } from 'react';
import { ShoppingCart, Heart, Star, Search, Filter, Grid, List, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../context/CartContext';

// Import your existing images
import classicLeatherChrono from '../assets/watches/classic-leather-chrono-watch.jpg';
import vintageRomanDial from '../assets/watches/vintage-roman-dial-watch.jpg';
import urbanMinimalist from '../assets/watches/urban-minimalist-watch.jpg';
import sapphireSilverDial from '../assets/watches/sapphire-silver-dial-watch.jpg';
import midnightBlueClassic from '../assets/watches/midnight-blue-classic-watch.jpg';
import brownLeatherRetro from '../assets/watches/brown-leather-retro-watch.jpg';
import glowFitPro from '../assets/watches/glowfit-pro-watch.jpg';
import timeWaveTouch from '../assets/watches/timewave-touch-watch.jpg';
import smartActiveGT from '../assets/watches/smartactive-gt-watch.jpg';
import pulseTrackX from '../assets/watches/pulsetrack-x-watch.jpg';
import glowTimeCore from '../assets/watches/glowtime-core-watch.jpg';
import vitalBand from '../assets/watches/vitalband-2.0-watch.jpg';
import neoAnalogSmartTime from '../assets/watches/neoanalog-smarttime-watch.jpg';
import glowLinkClassic from '../assets/watches/glowlink-classic-plus-watch.jpg';
import smartHeritageFusion from '../assets/watches/smart-heritage-fusion-watch.jpg';
import chronoSyncPro from '../assets/watches/chronosync-pro-watch.jpg';
import glowSportDigitalX from '../assets/watches/glowsport-digital-x-watch.jpg';
import ledPixelTime from '../assets/watches/led-pixel-time-watch.jpg';
import matrixGlow from '../assets/watches/matrix-glow-watch.jpg';
import aquaShockLite from '../assets/watches/aquashock-lite-watch.jpg';
import royalGoldElite from '../assets/watches/royal-gold-elite-watch.jpg';
import titaniumMasterpiece from '../assets/watches/titanium-masterpiece-watch.jpg';
import blackDiamondChrono from '../assets/watches/black-diamond-chrono-watch.jpg';
import emperorsChoice from '../assets/watches/emperors-choice-watch.jpg';
import opulenceQuartz360 from '../assets/watches/opulence-quartz-360-watch.jpg';
import glowTimePrestige from '../assets/watches/glowtime-prestige-watch.jpg';
import terrainTracker from '../assets/watches/terrain-tracker-watch.jpg';
import diveMaster from '../assets/watches/divemaster-500-watch.jpg';
import glowTimeStormX from '../assets/watches/glowtime-storm-x-watch.jpg';
import marathonRunnerPro from '../assets/watches/marathon-runner-pro-watch.jpg';
import Footer from '../components/Footer';

const watches = [
  { id: 1, name: "Classic Leather Chrono", image: classicLeatherChrono, price: 4999, category: "Classic", rating: 4.8, reviews: 124, isNew: true },
  { id: 2, name: "Vintage Roman Dial", image: vintageRomanDial, price: 5599, category: "Classic", rating: 4.7, reviews: 89, isNew: false },
  { id: 3, name: "Urban Minimalist", image: urbanMinimalist, price: 3499, category: "Classic", rating: 4.9, reviews: 156, isNew: false },
  { id: 4, name: "Sapphire Silver Dial", image: sapphireSilverDial, price: 6999, category: "Classic", rating: 4.6, reviews: 67, isNew: false },
  { id: 5, name: "Midnight Blue Classic", image: midnightBlueClassic, price: 4299, category: "Classic", rating: 4.8, reviews: 143, isNew: false },
  { id: 6, name: "Brown Leather Retro", image: brownLeatherRetro, price: 3799, category: "Classic", rating: 4.5, reviews: 98, isNew: false },
  { id: 7, name: "GlowFit Pro", image: glowFitPro, price: 5999, category: "Smart", rating: 4.9, reviews: 234, isNew: true },
  { id: 8, name: "TimeWave Touch", image: timeWaveTouch, price: 6499, category: "Smart", rating: 4.7, reviews: 189, isNew: false },
  { id: 9, name: "SmartActive GT", image: smartActiveGT, price: 6899, category: "Smart", rating: 4.8, reviews: 167, isNew: false },
  { id: 10, name: "PulseTrack X", image: pulseTrackX, price: 6299, category: "Smart", rating: 4.6, reviews: 145, isNew: false },
  { id: 11, name: "GlowTime Core", image: glowTimeCore, price: 5799, category: "Smart", rating: 4.7, reviews: 198, isNew: false },
  { id: 12, name: "VitalBand 2.0", image: vitalBand, price: 6999, category: "Smart", rating: 4.8, reviews: 223, isNew: false },
  { id: 13, name: "NeoAnalog SmartTime", image: neoAnalogSmartTime, price: 7999, category: "Smart", rating: 4.9, reviews: 178, isNew: false },
  { id: 14, name: "GlowLink Classic+", image: glowLinkClassic, price: 7499, category: "Smart", rating: 4.7, reviews: 134, isNew: false },
  { id: 15, name: "Smart Heritage Fusion", image: smartHeritageFusion, price: 8599, category: "Smart", rating: 4.8, reviews: 156, isNew: false },
  { id: 16, name: "ChronoSync Pro", image: chronoSyncPro, price: 8999, category: "Smart", rating: 4.9, reviews: 201, isNew: false },
  { id: 17, name: "GlowSport Digital X", image: glowSportDigitalX, price: 4599, category: "Sports", rating: 4.6, reviews: 167, isNew: false },
  { id: 18, name: "LED Pixel Time", image: ledPixelTime, price: 4999, category: "Digital", rating: 4.5, reviews: 89, isNew: false },
  { id: 19, name: "Matrix Glow", image: matrixGlow, price: 5299, category: "Digital", rating: 4.7, reviews: 123, isNew: false },
  { id: 20, name: "AquaShock Lite", image: aquaShockLite, price: 4899, category: "Sports", rating: 4.8, reviews: 189, isNew: false },
  { id: 21, name: "Royal Gold Elite", image: royalGoldElite, price: 14999, category: "Luxury", rating: 4.9, reviews: 67, isNew: true },
  { id: 22, name: "Titanium Masterpiece", image: titaniumMasterpiece, price: 19999, category: "Luxury", rating: 5.0, reviews: 45, isNew: false },
  { id: 23, name: "Black Diamond Chrono", image: blackDiamondChrono, price: 17999, category: "Luxury", rating: 4.8, reviews: 34, isNew: false },
  { id: 24, name: "Emperor's Choice", image: emperorsChoice, price: 23999, category: "Luxury", rating: 5.0, reviews: 23, isNew: false },
  { id: 25, name: "Opulence Quartz 360", image: opulenceQuartz360, price: 18999, category: "Luxury", rating: 4.9, reviews: 56, isNew: false },
  { id: 26, name: "GlowTime Prestige", image: glowTimePrestige, price: 20999, category: "Luxury", rating: 4.8, reviews: 78, isNew: false },
  { id: 27, name: "Terrain Tracker", image: terrainTracker, price: 5999, category: "Sports", rating: 4.7, reviews: 234, isNew: false },
  { id: 28, name: "DiveMaster 500", image: diveMaster, price: 8499, category: "Sports", rating: 4.8, reviews: 145, isNew: false },
  { id: 29, name: "GlowTime Storm-X", image: glowTimeStormX, price: 8999, category: "Sports", rating: 4.9, reviews: 167, isNew: false },
  { id: 30, name: "Marathon Runner Pro", image: marathonRunnerPro, price: 7999, category: "Sports", rating: 4.6, reviews: 198, isNew: false },
];

const categories = ['All', 'Classic', 'Smart', 'Sports', 'Digital', 'Luxury'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'rating', label: 'Highest Rated' }
];


const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());



  // Filter and sort logic
  const filteredAndSortedWatches = useMemo(() => {
    let filtered = watches.filter(watch => {
      const matchesSearch = watch.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || watch.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

       switch (sortOption) {
      case 'price-low': return filtered.sort((a, b) => a.price - b.price);
      case 'price-high': return filtered.sort((a, b) => b.price - a.price);
      case 'name': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating': return filtered.sort((a, b) => b.rating - a.rating);
      default: return filtered;
    }
  }, [searchTerm, selectedCategory, sortOption]);

  const handleAddToCart = (watch) => {
    addToCart(watch);
    toast.success(`${watch.name} added to cart`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleFavorite = (watchId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(watchId)) {
        newFavorites.delete(watchId);
      } else {
        newFavorites.add(watchId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOption('default');
  };

const WatchCard = ({ watch }) => (
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    {/* Image Container */}
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <img
        src={watch.image}
        alt={watch.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {watch.isNew && (
          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            NEW
          </span>
        )}
        <span className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {watch.category}
        </span>
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => toggleFavorite(watch.id)}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            favorites.has(watch.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          <Heart size={16} fill={favorites.has(watch.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>

    {/* Product Info */}
    <div className="p-5">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{watch.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span>{watch.rating}</span>
          <span className="text-gray-400">({watch.reviews})</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">₹{watch.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">Free shipping</span>
        </div>
        
        {/* Always visible Add to Cart button on mobile */}
        <button
          onClick={() => handleAddToCart(watch)}
          className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          <span className="hidden sm:inline">Add</span>
        </button>
        
        {/* Hidden on mobile, shown on hover for desktop */}
        <button
          onClick={() => handleAddToCart(watch)}
          className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add
        </button>
      </div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium</span> Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handcrafted timepieces that blend tradition with innovation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Category Filter - Mobile */}
            <div className="lg:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-3">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAndSortedWatches.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{watches.length}</span> products
            </span>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
              >
                <X size={16} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedWatches.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
