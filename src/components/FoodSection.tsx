import { foodData } from '@/data/content';

const FoodSection = () => {
  return (
    <section id="food" className="py-20 bg-gradient-to-b from-white to-qi-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-qi-gold font-kai text-lg tracking-widest">特色美食</span>
          <h2 className="text-3xl md:text-4xl font-kai text-qi-brown mt-2">舌尖蕲春 · 味道悠长</h2>
          <div className="w-24 h-1 bg-qi-green mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodData.map((food, index) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0"
              style={{
                animation: `slideUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-qi-gold text-white text-xs font-song rounded-full">
                  特产
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-kai text-xl font-bold text-qi-brown mb-2">{food.name}</h3>
                <p className="text-qi-brown/70 font-song text-sm leading-relaxed">
                  {food.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-qi-green to-qi-dark-green rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="font-kai text-2xl md:text-3xl font-bold mb-4">来蕲春，品美食</h3>
          <p className="font-song text-white/80 max-w-2xl mx-auto mb-8">
            蕲春美食融合了鄂东地区的特色风味，既有传统的农家菜肴，也有精致的药膳养生。
            每一道菜都承载着蕲春人的热情与匠心。
          </p>
          <button className="px-8 py-3 bg-white text-qi-green font-song rounded-full hover:bg-qi-beige transition-colors">
            探索更多美食
          </button>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;
