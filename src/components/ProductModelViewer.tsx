
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Since we can't use three.js directly in a Lovable project, we'll simulate 3D rotation
// with CSS transforms on product images
const ProductModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
    },
    {
      id: 3,
      name: "Modern Sneakers",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ]);
  const [activeProduct, setActiveProduct] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;
    
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Auto rotation when not dragging
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleProductChange = (index: number) => {
    setActiveProduct(index);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div 
        ref={containerRef}
        className="relative flex-1 cursor-grab active:cursor-grabbing perspective"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div 
          className="w-full h-full flex items-center justify-center transform-style preserve-3d transition-transform duration-200 ease-out"
          style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className="absolute w-64 h-64 backface-visibility-hidden">
            <img 
              src={products[activeProduct].image} 
              alt={products[activeProduct].name}
              className="w-full h-full object-contain shadow-lg"
              style={{ 
                transform: 'translateZ(0px)',
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => handleProductChange(index)}
            className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
              index === activeProduct ? 'border-primary scale-110' : 'border-gray-200'
            }`}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-2">
        {isDragging ? 'Dragging...' : 'Click and drag to rotate'}
      </p>
    </div>
  );
};

export default ProductModelViewer;
