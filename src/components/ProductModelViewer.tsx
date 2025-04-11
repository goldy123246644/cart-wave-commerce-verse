
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

// Since we can't use three.js directly in a Lovable project, we'll simulate 3D rotation
// with CSS transforms on product images
const ProductModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
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
    },
    {
      id: 4,
      name: "Stylish Sunglasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
    }
  ]);
  const [activeProduct, setActiveProduct] = useState(0);
  const [viewingAngles] = useState([
    { name: "Front", rotation: { x: 0, y: 0 } },
    { name: "Side", rotation: { x: 0, y: 90 } },
    { name: "Back", rotation: { x: 0, y: 180 } },
    { name: "Top", rotation: { x: -90, y: 0 } }
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPosition({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
    setAutoRotate(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startPosition.x;
    const deltaY = e.touches[0].clientY - startPosition.y;
    
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    
    setStartPosition({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      if (direction === 'in' && prev < 2) return prev + 0.1;
      if (direction === 'out' && prev > 0.5) return prev - 0.1;
      return prev;
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const setViewingAngle = (angle: { x: number, y: number }) => {
    setRotation(angle);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Auto rotation when enabled
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleProductChange = (index: number) => {
    setActiveProduct(index);
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50 bg-white p-6' : 'h-full w-full'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">{products[activeProduct].name}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAutoRotate}
            className={autoRotate ? "bg-primary/10" : ""}
          >
            <RotateCw className="h-4 w-4 mr-1" />
            Auto
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFullScreen}
          >
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative flex-1 cursor-grab active:cursor-grabbing perspective"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="w-full h-full flex items-center justify-center transform-style preserve-3d transition-transform duration-200 ease-out"
          style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
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
      
      <div className="pt-4 space-y-4">
        {/* View angles */}
        <div className="flex justify-center gap-2">
          {viewingAngles.map((angle, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setViewingAngle(angle.rotation)}
            >
              {angle.name}
            </Button>
          ))}
        </div>
        
        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom('out')}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Slider
            value={[scale * 50]}
            min={25}
            max={100}
            step={5}
            onValueChange={(value) => setScale(value[0] / 50)}
            className="flex-1"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleZoom('in')}
            disabled={scale >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Product thumbnails */}
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
        
        <p className="text-center text-sm text-muted-foreground">
          {isDragging ? 'Dragging...' : 'Click and drag to rotate'}
        </p>
      </div>
    </div>
  );
};

export default ProductModelViewer;
