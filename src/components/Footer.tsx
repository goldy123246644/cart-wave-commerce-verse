
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-store-border mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 py-8 px-6 bg-store-primary/5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-store-light-text">Stay updated with new products and exclusive offers.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none bg-store-primary hover:bg-store-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-store-primary mb-4 inline-block">ShopWave</Link>
            <p className="text-store-light-text mb-4">
              Quality products for modern lifestyles. Curated with care and delivered with passion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-store-light-text hover:text-store-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-store-light-text hover:text-store-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-store-light-text hover:text-store-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-store-light-text hover:text-store-primary transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-store-light-text hover:text-store-primary transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-store-light-text hover:text-store-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-store-light-text hover:text-store-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-store-light-text hover:text-store-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-store-light-text hover:text-store-primary transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/warranty" className="text-store-light-text hover:text-store-primary transition-colors">Warranty</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-store-light-text hover:text-store-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-store-light-text hover:text-store-primary transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-store-primary mt-0.5 flex-shrink-0" />
                <span className="text-store-light-text">1234 Store Street, City, State 56789</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-store-primary flex-shrink-0" />
                <span className="text-store-light-text">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-store-primary flex-shrink-0" />
                <span className="text-store-light-text">support@shopwave.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-store-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-store-light-text text-sm">
            &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
          </p>
          <p className="text-store-light-text text-sm mt-2 md:mt-0">
            Made with <Heart size={14} className="inline fill-store-error text-store-error mx-1" /> by ShopWave Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
