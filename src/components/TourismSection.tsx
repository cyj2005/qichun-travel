import { useState } from 'react';
import { X } from 'lucide-react';
import { tourismData } from '@/data/content';

const TourismSection = () => {
  const [selectedPlace, setSelectedPlace] = useState<typeof tourismData[0] | null>(null);

  return (
    <section id="tourism" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-qi-gold font-kai text-lg tracking-widest">旅游胜地</span>
          <h2 className="text-3xl md:text-4xl font-kai text-qi-brown mt-2">山水蕲春 · 养生福地</h2>
          <div className="w-24 h-1 bg-qi-green mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourismData.map((place, index) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer opacity-0"
              style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPlace(place)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-kai text-xl font-bold">{place.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-qi-brown/70 font-song text-sm line-clamp-2 mb-3">
                  {place.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-qi-green/10 text-qi-green text-xs font-song rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlace && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-kai text-3xl font-bold">{selectedPlace.name}</h3>
                <div className="flex gap-2 mt-2">
                  {selectedPlace.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white text-sm font-song rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-qi-brown/80 font-song leading-relaxed text-lg">
                {selectedPlace.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourismSection;
