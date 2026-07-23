import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Leaf } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-qi-brown text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-qi-gold" />
              <span className="font-kai text-2xl font-bold">蕲春</span>
            </div>
            <p className="text-white/70 font-song text-sm leading-relaxed">
              时珍故里，中国艾都。蕲春位于湖北省东部，大别山南麓，长江中游北岸。
              这里历史悠久，文化灿烂，物产丰富，是您旅游、养生、投资的理想之地。
            </p>
          </div>

          <div>
            <h3 className="font-kai text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 font-song text-sm hover:text-qi-gold transition-colors"
                >
                  首页
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 font-song text-sm hover:text-qi-gold transition-colors"
                >
                  历史文化
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('specialty')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 font-song text-sm hover:text-qi-gold transition-colors"
                >
                  蕲春四宝
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('tourism')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 font-song text-sm hover:text-qi-gold transition-colors"
                >
                  旅游景点
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('food')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/70 font-song text-sm hover:text-qi-gold transition-colors"
                >
                  特色美食
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-kai text-lg font-bold mb-4">联系方式</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-qi-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 font-song text-sm">
                  湖北省黄冈市蕲春县漕河镇
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-qi-gold flex-shrink-0" />
                <span className="text-white/70 font-song text-sm">0713-7232111</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-qi-gold flex-shrink-0" />
                <span className="text-white/70 font-song text-sm">contact@qichun.gov.cn</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-kai text-lg font-bold mb-4">关注我们</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-qi-gold hover:text-qi-brown transition-all">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-qi-gold hover:text-qi-brown transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-qi-gold hover:text-qi-brown transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-qi-gold hover:text-qi-brown transition-all">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/50 font-song text-xs mt-6">
              蕲春县文化和旅游局 版权所有
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 font-song text-sm">
              2024 蕲春县人民政府. 保留所有权利.
            </p>
            <button
              onClick={scrollToTop}
              className="px-6 py-2 bg-qi-green text-white font-song rounded-full hover:bg-qi-dark-green transition-colors"
            >
              返回顶部
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
