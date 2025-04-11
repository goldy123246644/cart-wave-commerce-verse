
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate a checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // In a real app, you would redirect to a success page
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center py-16">
          <ShoppingBag size={64} className="mx-auto mb-6 text-store-light-text" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-store-light-text mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild className="bg-store-primary hover:bg-store-primary/90">
            <Link to="/products">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
              <Button 
                variant="ghost" 
                className="text-store-light-text hover:text-store-error"
                onClick={clearCart}
              >
                <Trash2 size={18} className="mr-2" />
                Clear Cart
              </Button>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-store-primary transition-colors">
                        {item.name}
                      </Link>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <p className="text-sm text-store-light-text mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button 
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-store-text transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-store-text transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-store-light-text hover:text-store-error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between">
              <Button asChild variant="outline">
                <Link to="/products" className="flex items-center">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-store-light-text">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-store-light-text">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-store-light-text">Tax</span>
                <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-xl">${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-store-primary hover:bg-store-primary/90"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
            
            <div className="mt-4 text-center text-sm text-store-light-text">
              Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
