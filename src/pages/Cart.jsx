import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getTotalItems } = useCartStore();
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.13; 
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" className="w-64 mx-auto mb-8 mix-blend-multiply" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-8">My Cart ({getTotalItems()})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative group">
              <Link to={`/product/${item.id}`} className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
              </Link>
              
              <div className="flex-1 text-center sm:text-left">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors">{item.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                <div className="font-bold text-lg text-gray-900">Rs. {item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <div className="flex items-center border border-gray-300 rounded-lg h-10">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-500 hover:text-primary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900 text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                    className="px-3 py-1 text-gray-500 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="font-bold text-lg text-primary w-20 text-right hidden sm:block">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 absolute top-2 right-2 sm:static sm:top-auto sm:right-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Price Details</h2>
            
            <div className="flex flex-col gap-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-medium text-gray-900">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900">Rs. {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary">Rs. {total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <Link to="/" className="block text-center mt-4 text-sm text-gray-500 hover:text-primary font-medium transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
