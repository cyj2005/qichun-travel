import { historyData } from '@/data/content';

const HistorySection = () => {
  return (
    <section id="history" className="py-20 bg-qi-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-qi-gold font-kai text-lg tracking-widest">历史文化</span>
          <h2 className="text-3xl md:text-4xl font-kai text-qi-brown mt-2">千年传承 · 文化蕲春</h2>
          <div className="w-24 h-1 bg-qi-green mx-auto mt-4"></div>
        </div>

        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-6 min-w-max px-4">
            {historyData.map((item, index) => (
              <div
                key={item.id}
                className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0"
                style={{ animation: `slideLeft 0.6s ease-out forwards`, animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-kai text-xl font-bold">
                    {item.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-qi-brown/80 font-song text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-kai text-qi-green font-bold">2200+</div>
                <div className="text-qi-brown/60 font-song text-sm mt-1">建县历史</div>
              </div>
              <div>
                <div className="text-4xl font-kai text-qi-green font-bold">10</div>
                <div className="text-qi-brown/60 font-song text-sm mt-1">荆王传承</div>
              </div>
              <div>
                <div className="text-4xl font-kai text-qi-green font-bold">4300+</div>
                <div className="text-qi-brown/60 font-song text-sm mt-1">教授博士</div>
              </div>
              <div>
                <div className="text-4xl font-kai text-qi-green font-bold">86</div>
                <div className="text-qi-brown/60 font-song text-sm mt-1">文物保护单位</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
