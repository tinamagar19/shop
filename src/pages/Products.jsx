import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, getProductsByCategory } from '../api/products';
import ProductCard from '../components/ui/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery || '');
  const [priceRanges, setPriceRanges] = useState([
    { id: '1', label: 'Rs. 0 - 2,500', min: 0, max: 2500, checked: false },
    { id: '2', label: 'Rs. 2,500 - 5,000', min: 2500, max: 5000, checked: false },
    { id: '3', label: 'Rs. 5,000 - 10,000', min: 5000, max: 10000, checked: false },
    { id: '4', label: 'Rs. 10,000+', min: 10000, max: Infinity, checked: false },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        
        const formattedCategories = data.map(cat => ({
          name: typeof cat === 'string' ? cat.replace('-', ' ') : cat.name.replace('-', ' '),
          slug: typeof cat === 'string' ? cat : cat.slug
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory);
        } else {
          data = await getProducts(30, 0); 
        }
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

 
  useEffect(() => {
    if (categoryQuery !== selectedCategory) {
      setSelectedCategory(categoryQuery || '');
    }
  }, [categoryQuery]);

  const handleCategoryChange = (slug) => {
    if (selectedCategory === slug) {
      setSelectedCategory('');
      setSearchParams({});
    } else {
      setSelectedCategory(slug);
      setSearchParams({ category: slug });
    }
  };

  const handlePriceChange = (id) => {
    setPriceRanges(ranges => ranges.map(range => 
      range.id === id ? { ...range, checked: !range.checked } : range
    ));
  };

  const activePriceRanges = priceRanges.filter(r => r.checked);
  
  const filteredProducts = products.filter(product => {
    if (activePriceRanges.length === 0) return true;
    return activePriceRanges.some(range => product.price >= range.min && product.price <= range.max);
  });

  return (
    <div className="container mx-auto px-4 py-8 text-inter">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-poppins font-bold text-gray-900 mb-6">Filters</h2>
          
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    checked={selectedCategory === ''}
                    onChange={() => {
                      setSelectedCategory('');
                      setSearchParams({});
                    }}
                  />
                  <span className={`text-gray-600 group-hover:text-primary transition-colors ${selectedCategory === '' ? 'text-primary font-medium' : ''}`}>
                    All Categories
                  </span>
                </label>
                {categories.map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                      checked={selectedCategory === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                    />
                    <span className={`capitalize text-gray-600 group-hover:text-primary transition-colors ${selectedCategory === cat.slug ? 'text-primary font-medium' : ''}`}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Price Range</h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                      checked={range.checked}
                      onChange={() => handlePriceChange(range.id)}
                    />
                    <span className="text-gray-600 group-hover:text-primary transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex-1">
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2 capitalize">
            {selectedCategory ? selectedCategory.replace('-', ' ') : 'All Products'}
          </h1>
          <p className="text-gray-500 mb-8">Browse our complete collection of quality products.</p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-gray-50 rounded-xl">
               <p className="text-gray-500">No products found for the selected filters.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
