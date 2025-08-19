import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const products = [
  {
    name: "AURORA",
    description: "A delicate blend of morning dew and jasmine petals",
    notes: ["Bergamot", "White Jasmine", "Sandalwood"],
    price: "$180"
  },
  {
    name: "NOCTURNE",
    description: "Deep and mysterious, like moonlight on still water",
    notes: ["Black Currant", "Rose", "Amber"],
    price: "$195"
  },
  {
    name: "ZEPHYR",
    description: "Light and airy, capturing the essence of gentle breezes",
    notes: ["Citrus", "Lily of the Valley", "White Musk"],
    price: "$165"
  }
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collection" ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#141414] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-6">
            SIGNATURE COLLECTION
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Three distinct fragrances, each telling its own story of elegance and sophistication
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-full hover:border-white/20 transition-all duration-300">
                {/* Product bottle visualization */}
                <div className="aspect-square mb-8 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-40 bg-gradient-to-b from-white/20 to-white/10 rounded-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-2 bg-white/5 rounded-md" />
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white/30 rounded-t-md" />
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-light tracking-widest mb-3">{product.name}</h3>
                  <p className="text-white/70 font-light mb-6 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs tracking-wide text-white/50 mb-3 uppercase">Notes</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {product.notes.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs font-light"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xl font-light tracking-wide mb-6">{product.price}</div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-light tracking-widest"
                  >
                    DISCOVER
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
