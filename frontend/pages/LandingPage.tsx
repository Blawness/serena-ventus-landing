import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import CMSContent from '../components/CMSContent';
import ProductCard from '../components/ProductCard';
import Contact from '../components/Contact';
import { usePage, useProducts } from '../hooks/useCMS';

export default function LandingPage() {
  const { page: homePage, loading: pageLoading } = usePage('home');
  const { products, loading: productsLoading } = useProducts(true, 3);
  const productsRef = useRef(null);
  const isProductsInView = useInView(productsRef, { once: true, margin: "-100px" });

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414]" />
          
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-xl"
          />
          
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 blur-xl"
          />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl md:text-8xl font-extralight tracking-widest mb-6"
            >
              SERENA
              <br />
              <span className="text-4xl md:text-6xl">VENTUS</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl font-light tracking-wide text-white/80 mb-12 max-w-2xl mx-auto"
            >
              {pageLoading ? 
                "Where elegance meets essence. Discover fragrances that capture the whispers of wind and the serenity of nature." :
                homePage?.content?.hero?.subtitle || "Where elegance meets essence. Discover fragrances that capture the whispers of wind and the serenity of nature."
              }
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="space-x-4"
            >
              <Link to="/collection">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-3 border border-white/30 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="text-sm font-light tracking-widest">EXPLORE COLLECTION</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToAbout}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-8">
                  THE ESSENCE
                  <br />
                  <span className="text-white/70">OF ELEGANCE</span>
                </h2>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    Serena Ventus embodies the delicate balance between strength and grace, 
                    capturing the ethereal beauty of wind-carried scents that dance through 
                    serene landscapes.
                  </p>
                  
                  <p>
                    Each fragrance is meticulously crafted with the finest ingredients, 
                    creating olfactory experiences that transcend the ordinary and embrace 
                    the extraordinary.
                  </p>
                  
                  <p>
                    Our commitment to minimalist elegance reflects in every bottle, 
                    where simplicity meets sophistication in perfect harmony.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full" />
                    </div>
                    <h3 className="text-xl font-light tracking-wide mb-2">CRAFTED WITH CARE</h3>
                    <p className="text-sm text-white/60 font-light">Premium ingredients sourced globally</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section ref={productsRef} className="py-32 px-6 bg-gradient-to-b from-[#141414] to-[#0f0f0f]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-6">
                SIGNATURE COLLECTION
              </h2>
              <p className="text-white/60 font-light max-w-2xl mx-auto">
                Featured fragrances, each telling its own story of elegance and sophistication
              </p>
            </motion.div>

            {productsLoading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-96 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onDiscover={() => {
                      // Navigate to product detail or collection page
                      window.location.href = '/collection';
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-16"
            >
              <Link to="/collection">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-light tracking-widest"
                >
                  VIEW ALL FRAGRANCES
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}
