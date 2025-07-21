import React, { useState, useContext } from 'react';
import { Trash2, ChevronRight, ShoppingBag, X, AlertCircle, User, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Log the payload for debugging
   // Preparing payload, excluding image from items
    const payload = {
      ...formData,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      total: totalAmount,
      timestamp: new Date().toISOString()
    };
    console.log('Payload:', JSON.stringify(payload)); // Debug log

    // Save to Google Sheets
    await fetch('https://script.google.com/macros/s/AKfycbzCXff0VKsV4MHodrOSFBp85KDCocmQ2eZxnI8pyaB_Dkif4JO92dKJpFk8CiqC2O-a/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors', // Use no-cors to bypass CORS
      redirect: 'follow'
    });

    // Since no-cors returns an opaque response, assume success
    // Format WhatsApp message
    const message = `New Order from GlowTime Website\n\nCustomer Details:\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nOrder Items:\n${cartItems.map(item => 
      `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n')}\n\nTotal Amount: ₹${totalAmount}\n\nOrder submitted at: ${new Date().toLocaleString()}`;

    // Open WhatsApp with order details
    window.open(`https://wa.me/918248794519?text=${encodeURIComponent(message)}`, '_blank');
    
    // Clear cart after submission
    clearCart();
    setShowCheckoutForm(false);
    setFormData({ name: '', phone: '', address: '' });
  } catch (error) {
    console.error('Error submitting order:', error);
    alert(`Error: ${error.message || 'There was an error submitting your order. Please try again.'}`);
  } finally {
    setIsSubmitting(false);
  }
};
  if (cartItems.length === 0 && !showCheckoutForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">
        <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          <ShoppingBag className="text-gray-400" size={40} />
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-700 mb-2 sm:mb-3">Your cart is empty</h3>
        <p className="text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
          Discover amazing products and add them to your cart to get started with your shopping journey.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          Browse Products
          <ChevronRight className="ml-2" size={20} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="text-blue-600" size={28} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {showCheckoutForm ? 'Checkout' : 'Shopping Cart'}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {totalItems} item{totalItems !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {!showCheckoutForm && cartItems.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all border border-red-200 w-full sm:w-auto"
              >
                <Trash2 size={18} />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Clear All Confirmation Modal */}
          {showClearConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-red-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">Clear Cart</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove all items from your cart? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {showCheckoutForm ? (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <MapPin className="text-gray-400" size={18} />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={4}
                        className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        placeholder="Full address with landmark and pincode"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Order'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-3 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="relative w-full sm:w-24 h-24">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg border border-gray-100"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{item.name}</h3>
                        <p className="text-blue-600 font-bold text-lg sm:text-xl mb-3 sm:mb-4">₹{item.price.toLocaleString()}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                              >
                                -
                              </button>
                              <span className="px-3 py-2 font-medium min-w-[2rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="text-gray-600 font-medium text-sm sm:text-base">
                              Total: ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all self-end sm:self-auto"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-4 border border-gray-100">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Order Summary</h3>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Shipping Within 5km</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                    <div className="flex justify-between font-bold text-lg sm:text-xl">
                      <span>Total</span>
                      <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl mb-3 sm:mb-4 text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="text-center">
                    <Link 
                      to="/products"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;