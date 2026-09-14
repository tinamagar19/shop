import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/products';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">Shop by Category</h1>
      <p className="text-gray-500 mb-8">Find exactly what you're looking for in our organized categories.</p>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => {
            
            const categoryName = typeof category === 'string' ? category : category.name;
            const categorySlug = typeof category === 'string' ? category : category.slug;

            return (
              <Link
                key={index}
                to={`/products?category=${categorySlug}`} // For now just linking to products with a query param (or could create a specific category page route)
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md hover:border-primary/30 hover:text-primary transition-all group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                   
                   <span className="text-2xl capitalize font-bold text-primary opacity-50 group-hover:opacity-100">
                     {categoryName.charAt(0)}
                   </span>
                </div>
                <h3 className="font-semibold text-center text-gray-800 group-hover:text-primary capitalize">
                  {categoryName.replace('-', ' ')}
                </h3>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
