import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/products';
import { Star, ShieldCheck, Truck, RefreshCcw, Minus, Plus } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setActiveImage(data.images[0] || data.thumbnail);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found</div>;
  }

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
   
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link> &gt; <span className="capitalize">{product.category}</span> &gt; <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
       
        <div className="md:w-1/2 flex gap-4 flex-col-reverse md:flex-row">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0">
            {(product.images || [product.thumbnail]).map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`border-2 rounded-xl overflow-hidden aspect-square ${activeImage === img ? 'border-primary' : 'border-gray-200'} transition-all`}
              >
                <img src={img} alt={`${product.title} ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
            <img src={activeImage} alt={product.title} className="max-h-[500px] object-contain mix-blend-multiply" />
          </div>
        </div>

      
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-primary font-medium mb-4">{product.brand}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">{product.rating} ({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-bold text-gray-900">Rs. {product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through mb-1">Rs. {originalPrice}</span>
                <span className="text-sm font-semibold text-primary mb-2 bg-primary/10 px-2 py-1 rounded">{Math.round(product.discountPercentage)}% OFF</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

        
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg w-max h-12">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-500 hover:text-primary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 text-gray-500 hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-primary text-white h-12 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-white border border-primary text-primary h-12 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
              Buy Now
            </button>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 mt-auto">
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-gray-400" />
              <span>Free Shipping<br/>on orders over Rs. 50</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <RefreshCcw className="w-5 h-5 text-gray-400" />
              <span>7 Days Return<br/>hassle free</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span>Secure Payment<br/>100% protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
