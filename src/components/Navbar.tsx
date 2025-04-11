
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart, User, MapPin, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { cartItems } = useCart();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "All", "Deals", "Electronics", "Computers", "Smart Home", 
    "Home & Kitchen", "Fashion", "Books", "Toys", "Beauty"
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would redirect to search results
    console.log('Searching for:', searchQuery, 'in category:', searchCategory);
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}" in ${searchCategory}`,
    });
  };

  const handleNavigation = (path: string, label: string) => {
    if (path === '/customer-service' || path === '/registry' || path === '/gift-cards' || path === '/sell') {
      toast({
        title: `${label} section`,
        description: `This feature is coming soon!`,
      });
    } else {
      navigate(path);
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="text-white hover:text-yellow-300 transition-colors text-sm">Home</Link>
      <Link to="/products" className="text-white hover:text-yellow-300 transition-colors text-sm">Today's Deals</Link>
      <Link to="/categories" className="text-white hover:text-yellow-300 transition-colors text-sm">All Categories</Link>
      <Button 
        variant="link" 
        className="text-white hover:text-yellow-300 transition-colors text-sm p-0 h-auto"
        onClick={() => handleNavigation('/customer-service', 'Customer Service')}
      >
        Customer Service
      </Button>
      <Button 
        variant="link" 
        className="text-white hover:text-yellow-300 transition-colors text-sm p-0 h-auto"
        onClick={() => handleNavigation('/registry', 'Registry')}
      >
        Registry
      </Button>
      <Button 
        variant="link" 
        className="text-white hover:text-yellow-300 transition-colors text-sm p-0 h-auto"
        onClick={() => handleNavigation('/gift-cards', 'Gift Cards')}
      >
        Gift Cards
      </Button>
      <Button 
        variant="link" 
        className="text-white hover:text-yellow-300 transition-colors text-sm p-0 h-auto"
        onClick={() => handleNavigation('/sell', 'Sell')}
      >
        Sell
      </Button>
      <Link to="/dashboard" className="text-white hover:text-yellow-300 transition-colors text-sm">Dashboard</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      {/* Main Navbar */}
      <div className="bg-[#131921] py-2 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white mr-2">
              <span className="text-yellow-400">Ama</span>
              <span className="text-white">Shop</span>
            </Link>

            {/* Deliver To */}
            <div className="hidden md:flex text-white items-center mr-2">
              <MapPin size={18} className="text-gray-300 mr-1" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-300">Deliver to</span>
                <span className="text-sm font-semibold">United States</span>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 flex">
              <div className="relative flex-1 flex">
                <div className="hidden md:flex">
                  <select 
                    className="bg-gray-100 rounded-l-md px-2 py-2 text-sm border-r border-gray-300 focus:outline-none"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-l-md md:rounded-none border-0 flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-r-md px-4"
                >
                  <Search size={20} />
                </Button>
              </div>
            </form>

            {/* Right Nav Items */}
            <div className="flex items-center gap-4">
              {/* Account & Lists */}
              <div className="hidden md:flex flex-col text-white">
                <span className="text-xs">Hello, Sign in</span>
                <div className="flex items-center">
                  <span className="text-sm font-semibold">Account & Lists</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* Returns & Orders */}
              <div className="hidden md:flex flex-col text-white">
                <span className="text-xs">Returns</span>
                <span className="text-sm font-semibold">& Orders</span>
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative text-white hover:text-yellow-300 transition-colors">
                <div className="flex items-end">
                  <ShoppingCart size={24} />
                  <span className="text-sm font-semibold">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 left-3 bg-yellow-400 text-black h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full font-bold">
                        {cartItems.length}
                      </span>
                    )}
                  </span>
                </div>
              </Link>

              {/* Mobile Menu */}
              {isMobile && (
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white md:hidden">
                      <Menu size={24} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-[#232f3e] text-white w-[250px] sm:w-[300px]">
                    <div className="bg-[#232f3e] flex justify-between items-center p-4 border-b border-gray-700">
                      <span className="text-xl font-bold">Menu</span>
                      <Button variant="ghost" className="text-white p-0 h-auto" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={24} />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-6 mt-8 px-4">
                      <NavLinks />
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="bg-[#232f3e] py-1 px-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            {/* All Menu */}
            <div className="flex items-center text-white px-2 py-1 hover:bg-gray-700 cursor-pointer">
              <Menu size={18} className="mr-1" />
              <span className="text-sm font-medium">All</span>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex space-x-6 ml-4">
              <NavLinks />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
