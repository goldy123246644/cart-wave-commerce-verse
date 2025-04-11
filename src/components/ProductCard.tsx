
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, TruckIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discount price if available
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  return (
    <div 
      className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          {/* Image container with badges */}
          <div className="relative h-56 overflow-hidden bg-gray-100">
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-2 left-2 z-10 bg-amber-500 text-white">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">Out of Stock</Badge>
            )}
            {product.discount && (
              <Badge className="absolute top-2 right-2 z-10 bg-red-500 text-white font-bold">
                Save {product.discount}%
              </Badge>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          {/* Product details */}
          <div className="p-4">
            <h3 className="text-sm font-medium line-clamp-2 mb-1 h-10">{product.name}</h3>
            
            {/* Ratings */}
            <div className="flex items-center mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-blue-500 ml-1">
                {product.reviews || Math.floor(Math.random() * 1000)}
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-1">
              {discountedPrice ? (
                <div>
                  <span className="text-red-600 font-bold">${discountedPrice}</span>
                  <span className="text-gray-500 text-xs line-through ml-1">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Prime badge if applicable */}
            {product.primeEligible && (
              <div className="flex items-center text-xs mb-2">
                <span className="text-blue-600 font-bold">Prime</span>
                <TruckIcon size={12} className="ml-1 text-blue-600" />
                <span className="ml-1 text-xs text-gray-600">Free delivery</span>
              </div>
            )}
            
            {/* Add to cart button */}
            <Button 
              variant="default" 
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-500"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
