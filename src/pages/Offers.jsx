import React from 'react';
import { Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: 'Summer Sale',
      discount: 'Up to 50% OFF',
      description: 'Get the best deals on our summer collection. Valid until the end of the month.',
      code: 'SUMMER50',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      validUntil: '3 Days Left'
    },
    {
      id: 2,
      title: 'First Order Discount',
      discount: '20% OFF',
      description: 'New to ShopEase? Enjoy a special discount on your first purchase.',
      code: 'WELCOME20',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      validUntil: 'Ongoing'
    },
    {
      id: 3,
      title: 'Flash Deal',
      discount: 'Buy 1 Get 1',
      description: 'On selected beauty and electronics products. Don\'t miss out!',
      code: 'BOGOFRIDAY',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      validUntil: 'Ends Today'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">Special Offers</h1>
      <p className="text-gray-500 mb-8">Exclusive deals and coupons just for you.</p>

     
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-white mb-12 relative overflow-hidden flex flex-col items-start shadow-xl shadow-primary/20">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-md">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4 leading-tight">
            Mega Electronics Clearance
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Upgrade your tech game with massive discounts on top brands. Use code <span className="font-bold bg-white text-primary px-2 py-1 rounded">TECHSAVE</span> at checkout.
          </p>
          <Link to="/products" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
            Shop Now
          </Link>
        </div>
       
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-40 -mb-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <div key={offer.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className={`w-16 h-16 ${offer.bgColor} ${offer.textColor} rounded-xl flex items-center justify-center mb-6`}>
              <Tag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
            <div className="text-2xl font-bold text-primary mb-3">{offer.discount}</div>
            <p className="text-gray-600 mb-6 flex-grow">{offer.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Clock className="w-4 h-4" />
                {offer.validUntil}
              </div>
              <div className="bg-gray-100 border border-gray-200 border-dashed rounded px-3 py-1 font-mono text-sm font-bold text-gray-700">
                {offer.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
