import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Fashion Trends for Summer 2026',
      excerpt: 'Discover the hottest styles that will dominate the streets this summer, from vibrant colors to sustainable fabrics.',
      date: 'May 12, 2026',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Choosing the Right Smartphone',
      excerpt: 'Confused by all the options? We break down what you actually need to look for when upgrading your phone.',
      date: 'April 28, 2026',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 3,
      title: '5 Easy Ways to Make Your Home More Eco-Friendly',
      excerpt: 'Simple swaps and smart choices to reduce your carbon footprint without sacrificing style or comfort.',
      date: 'March 15, 2026',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Skincare Routine Basics for Glowing Skin',
      excerpt: 'A beginner-friendly guide to building a daily regimen that actually works for your specific skin type.',
      date: 'February 02, 2026',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">ShopEase Blog</h1>
      <p className="text-gray-500 mb-10">Tips, guides, and inspiration for your lifestyle.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row hover:shadow-md transition-shadow group">
            <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
                {post.category}
              </div>
            </div>
            <div className="p-6 sm:w-3/5 flex flex-col justify-center">
              <div className="text-xs font-medium text-gray-400 mb-2">{post.date}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                <Link to="#">{post.title}</Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <Link to="#" className="text-primary font-semibold text-sm hover:underline mt-auto inline-block">
                Read More &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
