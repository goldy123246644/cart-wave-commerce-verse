
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CategoryCard from '@/components/CategoryCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts, getCategories } from '@/services/productService';
import { Product, Category } from '@/types/product';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getFeaturedProducts(),
          getCategories()
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData.slice(0, 3)); // First 3 categories only
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                <p className="text-store-light-text mt-2">Shop our most popular items handpicked by our team</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link to="/products" className="flex items-center">
                  View All Products
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
            
            <ProductGrid products={featuredProducts} isLoading={isLoading} />
            
            <div className="mt-10 text-center sm:hidden">
              <Button asChild variant="outline">
                <Link to="/products" className="flex items-center justify-center">
                  View All Products
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-16 bg-store-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
              <p className="text-store-light-text mt-2">Find exactly what you need by browsing our product categories</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-56 bg-gray-200 rounded-lg"></div>
                  </div>
                ))
              ) : (
                categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))
              )}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link to="/categories" className="flex items-center justify-center">
                  View All Categories
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Shop With Us</h2>
              <p className="text-store-light-text">We strive to provide the best shopping experience possible</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-store-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-store-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-store-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                <p className="text-store-light-text text-sm">We carefully select every product in our catalog for quality and value.</p>
              </div>
              
              <div className="bg-store-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-store-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-store-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
                <p className="text-store-light-text text-sm">We ship all orders within 24 hours for the fastest possible delivery.</p>
              </div>
              
              <div className="bg-store-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-store-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-store-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Shopping</h3>
                <p className="text-store-light-text text-sm">Your personal information is always safe and secure with our encrypted checkout.</p>
              </div>
              
              <div className="bg-store-background p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-store-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-store-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                <p className="text-store-light-text text-sm">Not satisfied? Return any item within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-store-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Browse our collection of premium products and find exactly what you're looking for. 
              We offer fast shipping, easy returns, and exceptional customer service.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-store-primary hover:bg-white/90">
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
