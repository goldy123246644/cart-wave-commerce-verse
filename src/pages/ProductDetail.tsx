
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ArrowLeft, Star, Package, RefreshCw, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';
import { getProductById } from '@/services/productService';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const fetchedProduct = await getProductById(parseInt(id));
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            toast({
              title: "Product not found",
              description: "The product you're looking for doesn't exist.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Failed to load product",
          description: "There was an error loading the product details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="bg-gray-200 rounded-lg h-96"></div>
          <div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-store-primary hover:bg-store-primary/90">
          <Link to="/products">
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/products" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-store-light-text hover:text-store-primary text-sm">
              {product.category}
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={`${i < Math.floor(product.rating) ? 'fill-store-accent text-store-accent' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-store-light-text">{product.rating} rating</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</h2>
          
          <p className="text-store-light-text mb-6">{product.description}</p>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                In Stock ({product.stock} available)
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                Out of Stock
              </Badge>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-store-light-text">Quantity:</span>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-store-text transition-colors"
                onClick={decrementQuantity}
                disabled={quantity <= 1 || product.stock === 0}
              >
                <Minus size={16} />
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button 
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-store-text transition-colors"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock || product.stock === 0}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              className="flex-1 bg-store-primary hover:bg-store-primary/90"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1"
            >
              <Heart size={18} className="mr-2" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Shipping Info */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-store-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-store-light-text">Orders over $50 qualify for free shipping</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Package size={20} className="text-store-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">Secure Packaging</h4>
                <p className="text-sm text-store-light-text">Your items will be packaged securely for protection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <RefreshCw size={20} className="text-store-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium">30-Day Returns</h4>
                <p className="text-sm text-store-light-text">Shop with confidence with our 30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-semibold">Product Description</h3>
              <p className="text-store-light-text">{product.description}</p>
              <p className="text-store-light-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
              <p className="text-store-light-text">Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa. Sed consectetur egestas orci, at faucibus leo varius eget.</p>
            </TabsContent>
            
            <TabsContent value="specifications" className="space-y-4">
              <h3 className="text-xl font-semibold">Specifications</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 py-2 border-b">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span>ShopWave</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b">
                  <span className="font-medium">Material</span>
                  <span>Premium Quality</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b">
                  <span className="font-medium">Warranty</span>
                  <span>1 Year</span>
                </div>
                <div className="grid grid-cols-2 py-2">
                  <span className="font-medium">Made In</span>
                  <span>USA</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center my-6">
                <p className="text-store-light-text">No reviews yet. Be the first to review this product!</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
