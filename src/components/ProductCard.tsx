
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
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

  return (
    <div 
      className="product-card bg-white rounded-lg shadow-sm overflow-hidden product-card-transition"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative product-image-container h-64">
          {product.stock < 10 && product.stock > 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-store-accent text-white">Low Stock</Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-2 left-2 z-10 bg-store-error text-white">Out of Stock</Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2 z-10 bg-store-primary text-white">Featured</Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
          
          {/* Quick action buttons on hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white text-store-text hover:bg-store-primary hover:text-white"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white text-store-text hover:bg-store-primary hover:text-white"
            >
              <Heart size={18} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star size={16} className="fill-store-accent text-store-accent" />
            <span className="text-sm text-store-light-text">{product.rating}</span>
          </div>
          
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="mt-3">
            <Button 
              variant="default" 
              className="w-full bg-store-primary hover:bg-store-primary/90"
              onClick={handleAddToCart}
              disabled={product.stock ===.0}
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
