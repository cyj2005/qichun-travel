import { useState } from 'react';
import { specialtyData } from '@/data/content';

const SpecialtySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="specialty" className="py-20 bg-gradient-to-b from-qi-beige to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-qi-gold font-kai text-lg tracking-widest">特产瑰宝</span>
          <h2 className="text-3xl md:text-4xl font-kai text-qi-brown mt-2">蕲春四宝 · 闻名天下</h2>
          <div className="w-24 h-1 bg-qi-green mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-qi-green/10 rotate-45 rounded-xl"></div>
            <div className="absolute inset-4 bg-qi-gold/10 rotate-45 rounded-xl"></div>
            
            {specialtyData.map((item, index) => (
              <div
                key={item.id}
                className={`absolute w-48 h-48 transition-all duration-500 ${
                  index === 0 ? 'top-0 left-1/2 -translate-x-1/2' : ''
                } ${index === 1 ? 'top-1/2 right-0 -translate-y-1/2' : ''} ${
                  index === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' : ''
                } ${index === 3 ? 'top-1/2 left-0 -translate-y-1/2' : ''} ${
                  activeIndex === index ? 'scale-110 z-10' : 'scale-90 opacity-70'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-white font-kai text-xl font-bold">{item.name}</h3>
                      <p className="text-white/80 font-song text-sm">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-qi-green rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white font-kai text-2xl font-bold text-center leading-tight">
                蕲春<br />四宝
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-qi-green/20 rounded-full flex items-center justify-center">
                  <span className="text-qi-green font-kai text-2xl font-bold">
                    {specialtyData[activeIndex].name}
                  </span>
                </div>
                <div>
                  <h3 className="font-kai text-2xl font-bold text-qi-brown">
                    {specialtyData[activeIndex].name}
                  </h3>
                  <p className="text-qi-gold font-song">{specialtyData[activeIndex].title}</p>
                </div>
              </div>
              <p className="text-qi-brown/80 font-song leading-relaxed">
                {specialtyData[activeIndex].description}
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              {specialtyData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 py-2 rounded-full font-song text-sm transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-qi-green text-white shadow-lg'
                      : 'bg-qi-green/10 text-qi-brown hover:bg-qi-green/20'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtySection;
