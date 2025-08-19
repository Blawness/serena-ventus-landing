import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import CMSContent from '../components/CMSContent';
import { usePage } from '../hooks/useCMS';

export default function AboutPage() {
  const { page, loading } = usePage('about');
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const craftRef = useRef(null);
  
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isCraftInView = useInView(craftRef, { once: true, margin: "-100px" });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-white/60">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      
      <PageHeader 
        title={page?.title || "ABOUT"} 
        subtitle={page?.subtitle || "Discover the story behind Serena Ventus and our commitment to olfactory excellence"}
      />

      {/* CMS Content */}
      {page?.content && (
        <CMSContent content={page.content} />
      )}

      {/* Our Story */}
      <section ref={storyRef} className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-8">
                OUR STORY
              </h2>
              
              <div className="space-y-6 text-white/80 font-light leading-relaxed">
                <p>
                  Founded in 2018, Serena Ventus emerged from a passion for capturing 
                  the ephemeral beauty of nature's most delicate moments. Our founder, 
                  inspired by the gentle whispers of wind through ancient forests, 
                  sought to create fragrances that transcend the ordinary.
                </p>
                
                <p>
                  Each bottle represents years of meticulous research, traveling to 
                  remote corners of the world to source the finest raw materials. 
                  From the jasmine fields of Grasse to the sandalwood forests of 
                  Mysore, we believe in honoring the origins of our ingredients.
                </p>
                
                <p>
                  Today, Serena Ventus stands as a testament to the belief that 
                  true luxury lies not in excess, but in the perfect balance of 
                  simplicity and sophistication.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm text-white/60 font-light italic">
                    "Fragrance is the art of memory, capturing moments that words cannot express."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-32 px-6 bg-gradient-to-b from-[#141414] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-6">
              OUR VALUES
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">
              The principles that guide every decision and inspire every creation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "SUSTAINABILITY",
                description: "We are committed to ethical sourcing and environmental responsibility in every aspect of our production process."
              },
              {
                title: "CRAFTSMANSHIP",
                description: "Each fragrance is meticulously crafted by master perfumers with decades of experience and an unwavering attention to detail."
              },
              {
                title: "AUTHENTICITY",
                description: "We believe in creating genuine experiences that connect with the soul, avoiding trends in favor of timeless elegance."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-xl font-light tracking-wide mb-4">{value.title}</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section ref={craftRef} className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCraftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-6">
              THE CRAFT
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">
              Behind every bottle lies months of careful composition and refinement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isCraftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-light tracking-wide mb-4">INGREDIENT SELECTION</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  We source only the finest natural ingredients from trusted suppliers 
                  around the world, ensuring each component meets our exacting standards 
                  for quality and purity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light tracking-wide mb-4">COMPOSITION PROCESS</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  Our master perfumers spend months developing each fragrance, 
                  carefully balancing top, heart, and base notes to create 
                  harmonious compositions that evolve beautifully on the skin.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light tracking-wide mb-4">MATURATION & TESTING</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  Every fragrance undergoes extensive maturation and testing phases, 
                  ensuring optimal performance and longevity before it reaches our 
                  discerning clientele.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isCraftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-white/10 rounded-full" />
                    ))}
                  </div>
                  <h3 className="text-lg font-light tracking-wide mb-2">PERFUMER'S ORGAN</h3>
                  <p className="text-xs text-white/60 font-light">Where artistry meets science</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 font-light text-sm tracking-wide">
            © 2024 SERENA VENTUS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
