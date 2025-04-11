
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ArrowLeft, Star, Package, ShieldCheck, Heart, ShoppingCart, Plus, Minus, Check, Gift, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product';
import { getProductById, getProductsByCategory } from '@/services/productService';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedOption, setSelectedOption] = useState<Record<string, string>>({});
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const fetchedProduct = await getProductById(parseInt(id));
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            setSelectedImage(fetchedProduct.image);
            
            // Also fetch related products from same category
            const related = await getProductsByCategory(fetchedProduct.category);
            setRelatedProducts(related.filter(p => p.id !== fetchedProduct.id).slice(0, 4));
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

    fetchProductAndRelated();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) added to your cart`,
      });
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate discount price if available
  const discountedPrice = product?.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  // Generate some example images for the gallery
  const productImages = product ? [
    product.image,
    // Generate some variations for the gallery
    `https://source.unsplash.com/random/400x400/?${product.category.toLowerCase()}`,
    `https://source.unsplash.com/random/400x400/?${product.tags?.[0] || product.category.toLowerCase()}`,
    `https://source.unsplash.com/random/400x400/?${product.tags?.[1] || product.category.toLowerCase()}`,
  ] : [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
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
        <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <Link to="/products">
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="ghost" asChild className="mb-4 text-sm">
          <Link to="/products" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to results
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Images - Left Column */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="mb-4">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-auto object-contain bg-white border rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`border rounded-md cursor-pointer overflow-hidden ${selectedImage === img ? 'border-yellow-500 border-2' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info - Middle Column */}
        <div className="md:col-span-1">
          <div className="mb-1">
            <Link to={`/products?category=${encodeURIComponent(product.category.toLowerCase())}`} className="text-blue-500 hover:underline text-sm">
              {product.category}
            </Link>
          </div>
          
          <h1 className="text-xl font-medium mb-2">{product.name}</h1>
          
          {/* Brand / Seller */}
          <div className="mb-2">
            <Link to={`/seller/${product.sellerId || '1'}`} className="text-blue-500 hover:underline text-sm">
              Visit the {product.sellerName || 'AmaShop'} Store
            </Link>
          </div>
          
          {/* Ratings */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={`${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <Link to="#reviews" className="text-blue-500 hover:underline text-sm">
              {product.reviews || Math.floor(Math.random() * 1000)} ratings
            </Link>
          </div>
          
          {/* Price */}
          <div className="mb-3">
            {discountedPrice ? (
              <>
                <div className="flex items-baseline">
                  <span className="text-sm">List Price: </span>
                  <span className="text-gray-500 line-through ml-1 text-sm">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-baseline mb-1">
                  <span className="text-red-600 text-2xl font-medium">${discountedPrice}</span>
                  <Badge className="ml-2 bg-red-500 text-white">Save {product.discount}%</Badge>
                </div>
              </>
            ) : (
              <div className="text-2xl font-medium mb-1">
                ${product.price.toFixed(2)}
              </div>
            )}
            <div className="text-sm">
              <span className="font-medium">$</span>
              <span className="font-medium">
                {(discountedPrice ? parseFloat(discountedPrice) : product.price).toFixed(2)}
              </span> 
              {product.primeEligible && (
                <span className="ml-1">
                  & <span className="text-blue-600 font-bold">FREE Returns</span>
                </span>
              )}
            </div>
          </div>
          
          {/* Prime badge if applicable */}
          {product.primeEligible && (
            <div className="flex items-center mb-3">
              <span className="text-blue-600 font-bold mr-1">Prime</span>
              <Truck size={16} className="text-blue-600" />
              <span className="ml-1 text-sm">FREE delivery</span>
            </div>
          )}
          
          {/* Product description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">About this item</h3>
            <p className="text-sm text-gray-700 mb-4">{product.description}</p>
          </div>
          
          {/* Product Options */}
          {product.options && product.options.length > 0 && (
            <div className="space-y-4 mb-4">
              {product.options.map((option) => (
                <div key={option.name}>
                  <h3 className="font-medium text-sm mb-1">Select {option.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        className={`border rounded-md py-1 px-2 text-sm ${
                          selectedOption[option.name] === value 
                            ? 'border-yellow-500 bg-yellow-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedOption({...selectedOption, [option.name]: value})}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buy Box - Right Column */}
        <div className="md:col-span-1">
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <div className="text-lg font-medium mb-1">
              ${(discountedPrice ? parseFloat(discountedPrice) : product.price).toFixed(2)}
            </div>
            
            {product.primeEligible && (
              <div className="flex items-center mb-2 text-sm">
                <span className="text-blue-600 font-bold mr-1">Prime</span>
                <Truck size={14} className="text-blue-600" />
                <span className="ml-1">FREE delivery</span>
              </div>
            )}
            
            <div className="flex items-start mb-3 text-sm">
              <MapPin size={16} className="text-gray-500 mr-1 mt-0.5 flex-shrink-0" />
              <div>
                <span>Deliver to United States - New York 10001</span>
                <button className="text-blue-500 hover:underline ml-1">Update location</button>
              </div>
            </div>
            
            {/* Stock status */}
            <div className="mb-4">
              {product.stock > 20 ? (
                <p className="text-green-600 font-medium text-lg">In Stock</p>
              ) : product.stock > 0 ? (
                <p className="text-orange-500 font-medium">Only {product.stock} left in stock - order soon</p>
              ) : (
                <p className="text-red-500 font-medium">Out of Stock</p>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <span className="text-sm mr-2">Quantity:</span>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || product.stock === 0}
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-1 text-sm">{quantity}</span>
                <button 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock || product.stock === 0}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2 mb-4">
              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-500"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="default" 
                className="w-full bg-orange-400 hover:bg-orange-500 text-black border border-orange-500"
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Secure transaction */}
            <div className="flex items-start text-sm mb-3">
              <ShieldCheck size={16} className="text-gray-500 mr-1 mt-0.5 flex-shrink-0" />
              <span>Secure transaction</span>
            </div>
            
            {/* Shipping details */}
            <div className="text-sm mb-2">
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">Ships from</span>
                <span className="col-span-2">AmaShop.com</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">Sold by</span>
                <span className="col-span-2">{product.sellerName || 'AmaShop.com'}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">Returns</span>
                <span className="col-span-2">
                  <Link to="/returns" className="text-blue-500 hover:underline">
                    Eligible for Return, Refund or Replacement within 30 days
                  </Link>
                </span>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            {/* Add to list */}
            <button className="flex items-center text-blue-500 hover:underline text-sm">
              <Heart size={16} className="mr-1" />
              Add to List
            </button>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Products related to this item</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
      
      {/* Product details and reviews */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="description">Product Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          </TabsList>
          <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-semibold">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
              <p className="text-gray-700">Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa. Sed consectetur egestas orci, at faucibus leo varius eget.</p>
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
                  <span>{product.sellerName || 'AmaShop'}</span>
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
            
            <TabsContent value="reviews" id="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="text-3xl font-bold mb-1">{product.rating.toFixed(1)}</div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={`${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.reviews || Math.floor(Math.random() * 1000)} ratings
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const percentage = stars === Math.round(product.rating) 
                        ? 60 
                        : Math.round(Math.random() * 30);
                      return (
                        <div key={stars} className="flex items-center">
                          <div className="flex items-center mr-2">
                            <span className="text-sm mr-1">{stars}</span>
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm ml-2">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-6">
                <div className="p-4 border-b">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">Great product, highly recommend!</h4>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Reviewed in the United States on July 15, 2023
                  </div>
                  <div className="mb-3">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">Verified Purchase</Badge>
                  </div>
                  <p className="text-gray-700 text-sm">
                    This product exceeded my expectations! The quality is excellent and it arrived quickly. 
                    Would definitely purchase again.
                  </p>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">Good value for money</h4>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Reviewed in the United States on June 3, 2023
                  </div>
                  <div className="mb-3">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">Verified Purchase</Badge>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Very happy with my purchase. The product is well-made and looks exactly like the pictures.
                    Fast shipping too!
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="mx-auto">
                  See all reviews
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
