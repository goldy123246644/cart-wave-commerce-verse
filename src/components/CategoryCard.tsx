
import { Link } from 'react-router-dom';
import { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.id}`} className="block group">
      <div className="relative rounded-lg overflow-hidden">
        <div className="h-56 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
