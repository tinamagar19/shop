import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import useCartStore from '../../store/useCartStore';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 relative group flex flex-col h-full border border-gray-100">
      <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm text-gray-400 hover:text-primary transition-colors">
        <Heart className="w-5 h-5" />
      </button>
      
      <Link to={`/product/${product.id}`} className="block relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105 duration-300"
        />
      </Link>

      <div className="flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-base text-gray-800 line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        </Link>
        
        <div className="flex items-center gap-1 mb-3 mt-auto">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-lg text-gray-900">Rs. {product.price.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">Rs. {originalPrice}</span>
              <span className="text-xs font-semibold text-primary">{Math.round(product.discountPercentage)}% OFF</span>
            </>
          )}
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full py-2 px-4 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
