
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-store-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-store-text leading-tight mb-6">
              Discover Modern <span className="text-store-primary">Essentials</span> for Your Lifestyle
            </h1>
            <p className="text-lg text-store-light-text mb-8 max-w-lg mx-auto md:mx-0">
              Curated collection of premium products designed to enhance your everyday experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-store-primary hover:bg-store-primary/90 text-white">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/categories">
                  Explore Categories
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Featured Product Collection"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-8 w-16 h-16 rounded-full bg-store-accent/20 -z-10"></div>
              <div className="absolute bottom-1/3 -right-10 w-24 h-24 rounded-full bg-store-primary/20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Background pattern */}
      <div className="absolute top-0 right-0 -z-10 transform translate-x-1/4 -translate-y-1/4">
        <div className="w-64 h-64 rounded-full bg-store-secondary/30 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 transform -translate-x-1/4 translate-y-1/4">
        <div className="w-64 h-64 rounded-full bg-store-accent/20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Hero;
