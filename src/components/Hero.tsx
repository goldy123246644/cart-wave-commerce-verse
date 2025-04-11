
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Early Black Friday Deals",
      description: "Shop our biggest sale of the year with deals up to 70% off!",
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "New Electronics Just Arrived",
      description: "The latest gadgets and tech accessories at incredible prices.",
      buttonText: "Explore Electronics",
      buttonLink: "/products?category=electronics"
    },
    {
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Home Essentials",
      description: "Everything you need to make your home comfortable and stylish.",
      buttonText: "Shop Home",
      buttonLink: "/products?category=home-decor"
    }
  ];

  // Auto-scroll through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full">
      {/* Hero Image Slider */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h1>
              <p className="text-sm md:text-lg mb-4 max-w-lg">{slide.description}</p>
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                <Link to={slide.buttonLink}>
                  {slide.buttonText}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Cards below hero */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="font-bold text-lg mb-2">Top deals</h2>
            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                 alt="Deals" 
                 className="w-full h-40 object-cover rounded-md mb-2" />
            <Link to="/products" className="text-blue-500 text-sm">See all deals</Link>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="font-bold text-lg mb-2">Pickup where you left off</h2>
            <div className="grid grid-cols-2 gap-2">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" 
                   alt="Recently viewed" 
                   className="w-full h-20 object-cover rounded-md" />
              <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                   alt="Recently viewed" 
                   className="w-full h-20 object-cover rounded-md" />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80" 
                   alt="Recently viewed" 
                   className="w-full h-20 object-cover rounded-md" />
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1340&q=80" 
                   alt="Recently viewed" 
                   className="w-full h-20 object-cover rounded-md" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="font-bold text-lg mb-2">Sign in for the best experience</h2>
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black mb-2">Sign in securely</Button>
            <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80" 
                 alt="Sign in" 
                 className="w-full h-32 object-cover rounded-md" />
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="font-bold text-lg mb-2">We ship over 45 million products</h2>
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1340&q=80" 
                 alt="Products" 
                 className="w-full h-40 object-cover rounded-md mb-2" />
            <Link to="/categories" className="text-blue-500 text-sm">
              <div className="flex items-center">
                <span>Explore all categories</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
