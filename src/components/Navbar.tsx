
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { cartItems } = useCart();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/" className="text-store-text hover:text-store-primary transition-colors">Home</Link>
      <Link to="/products" className="text-store-text hover:text-store-primary transition-colors">Shop</Link>
      <Link to="/categories" className="text-store-text hover:text-store-primary transition-colors">Categories</Link>
      <Link to="/about" className="text-store-text hover:text-store-primary transition-colors">About</Link>
      <Link to="/contact" className="text-store-text hover:text-store-primary transition-colors">Contact</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-store-primary">ShopWave</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>

          {/* Search bar (desktop) */}
          {!isMobile && (
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-8'}`}>
              {isSearchOpen ? (
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 pl-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-store-primary"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X size={18} className="text-store-light-text" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-store-text hover:text-store-primary">
                  <Search size={22} />
                </button>
              )}
            </div>
          )}

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden sm:block text-store-text hover:text-store-primary transition-colors">
              <Heart size={22} />
            </Link>
            <Link to="/account" className="hidden sm:block text-store-text hover:text-store-primary transition-colors">
              <User size={22} />
            </Link>
            
            <Link to="/cart" className="relative text-store-text hover:text-store-primary transition-colors">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-store-primary text-white h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                  {cartItems.length}
                </Badge>
              )}
            </Link>

            {/* Mobile menu */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={22} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-6 mt-8">
                    <NavLinks />
                    <div className="relative w-full mt-4">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full py-2 pl-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-store-primary"
                      />
                      <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-store-light-text" />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
