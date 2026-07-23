import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HistorySection from '@/components/HistorySection';
import SpecialtySection from '@/components/SpecialtySection';
import TourismSection from '@/components/TourismSection';
import FoodSection from '@/components/FoodSection';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HistorySection />
        <SpecialtySection />
        <TourismSection />
        <FoodSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
