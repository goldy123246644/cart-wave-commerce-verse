
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/types/product';
import { getProducts, getCategories } from '@/services/productService';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Extract category from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData.map(cat => cat.name));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    const applyFilters = () => {
      let result = [...products];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      // Filter by selected categories
      if (selectedCategories.length > 0) {
        result = result.filter(p => selectedCategories.includes(p.category));
      }
      
      // Filter by price range
      result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      
      // Apply sorting
      switch(sortOption) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          // In a real app, you'd sort by date
          result.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
      
      setFilteredProducts(result);
    };
    
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, selectedCategories, priceRange, searchQuery, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSearchQuery('');
    
    // Clear URL params
    navigate('/products');
  };

  const FiltersSidebar = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-store-light-text hover:text-store-primary"
            onClick={clearFilters}
          >
            <X size={16} className="mr-1" />
            Clear
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Search filter */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-store-light-text" />
            <Input 
              placeholder="Search products..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Categories filter */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range filter */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <Slider 
              value={priceRange} 
              min={0} 
              max={200} 
              step={1}
              onValueChange={setPriceRange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-store-light-text">${priceRange[0]}</span>
              <span className="text-sm text-store-light-text">${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Shop Our Products</h1>
      <p className="text-store-light-text mb-8">
        Discover our curated collection of premium products designed to enhance your lifestyle.
      </p>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <div className="py-6">
                  <FiltersSidebar />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="hidden md:block">
              <span className="text-sm text-store-light-text">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </span>
            </div>
          )}
          
          {/* Sort options */}
          <div className="flex-1 md:flex-none">
            <select 
              className="w-full md:w-auto bg-white border border-store-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-store-primary text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        
        {/* Mobile product count */}
        <div className="md:hidden">
          <span className="text-sm text-store-light-text">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FiltersSidebar />
          </div>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Products;
