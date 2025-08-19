import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
      </main>
    </div>
  );
}
