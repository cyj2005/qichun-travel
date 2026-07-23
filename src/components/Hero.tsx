import { ChevronDown, Play } from 'lucide-react';

const Hero = () => {
  const scrollToSection = () => {
    const element = document.getElementById('history');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20Hubei%20Qichun%20mountains%20river%20traditional%20Chinese%20scenery%20green%20nature&image_size=landscape_16_9"
          alt="蕲春风光"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-slide-up">
          <span className="text-qi-gold font-kai text-lg md:text-xl tracking-widest mb-4 block opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            湖北省黄冈市蕲春县
          </span>
        </div>

        <h1 className="text-white font-kai text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          时珍故里
        </h1>
        <h1 className="text-white font-kai text-4xl md:text-6xl lg:text-7xl font-bold mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          中国艾都
        </h1>

        <p className="text-white/90 font-song text-lg md:text-xl max-w-2xl mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          大爱李时珍，养生到蕲春
        </p>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '1.1s' }}>
          <button
            onClick={scrollToSection}
            className="px-8 py-3 bg-qi-green text-white font-song rounded-full hover:bg-qi-dark-green transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-qi-green/30"
          >
            <Play className="w-5 h-5" />
            探索蕲春
          </button>
          <button
            onClick={scrollToSection}
            className="px-8 py-3 border-2 border-white text-white font-song rounded-full hover:bg-white/10 transition-all duration-300"
          >
            了解更多
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <button onClick={scrollToSection} className="text-white/80 hover:text-qi-gold transition-colors">
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
