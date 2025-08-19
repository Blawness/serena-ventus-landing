import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
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
  );
}
