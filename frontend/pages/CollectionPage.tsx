import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

const products = [
  {
    name: "AURORA",
    description: "A delicate blend of morning dew and jasmine petals, capturing the first light of dawn",
    longDescription: "Aurora opens with sparkling bergamot and fresh morning dew, transitioning into a heart of white jasmine and lily of the valley. The base of sandalwood and white musk creates a serene, luminous finish that lingers like the memory of a perfect sunrise.",
    notes: {
      top: ["Bergamot", "Morning Dew", "Pink Grapefruit"],
      heart: ["White Jasmine", "Lily of the Valley", "Peony"],
      base: ["Sandalwood", "White Musk", "Blonde Woods"]
    },
    price: "$180",
    size: "50ml"
  },
  {
    name: "NOCTURNE",
    description: "Deep and mysterious, like moonlight dancing on still water",
    longDescription: "Nocturne begins with the dark richness of black currant and bergamot, evolving into an intoxicating bouquet of Bulgarian rose and violet. The base reveals warm amber, vanilla, and precious woods, creating an enigmatic fragrance perfect for evening wear.",
    notes: {
      top: ["Black Currant", "Bergamot", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Violet", "Iris"],
      base: ["Amber", "Vanilla", "Precious Woods"]
    },
    price: "$195",
    size: "50ml"
  },
  {
    name: "ZEPHYR",
    description: "Light and airy, capturing the essence of gentle summer breezes",
    longDescription: "Zephyr embodies the carefree spirit of summer with its fresh citrus opening of lemon and mandarin. The heart blooms with delicate florals including lily of the valley and freesia, while the base of white musk and cedar provides an clean, airy finish.",
    notes: {
      top: ["Lemon", "Mandarin", "Green Leaves"],
      heart: ["Lily of the Valley", "Freesia", "White Tea"],
      base: ["White Musk", "Cedar", "Soft Amber"]
    },
    price: "$165",
    size: "50ml"
  },
  {
    name: "SOLSTICE",
    description: "A warm embrace of golden hour, where earth meets sky",
    longDescription: "Solstice captures the magic of the longest day with warm spices and golden florals. Opening with cardamom and orange blossom, it reveals a heart of tuberose and ylang-ylang, grounded by a base of sandalwood, benzoin, and soft vanilla.",
    notes: {
      top: ["Cardamom", "Orange Blossom", "Mandarin"],
      heart: ["Tuberose", "Ylang-Ylang", "Magnolia"],
      base: ["Sandalwood", "Benzoin", "Soft Vanilla"]
    },
    price: "$210",
    size: "50ml"
  },
  {
    name: "TEMPEST",
    description: "The raw power of nature, captured in crystalline clarity",
    longDescription: "Tempest evokes the electric energy before a storm with its bold opening of sea salt and ozonic notes. The heart reveals stormy florals like iris and cyclamen, while the base of driftwood, ambergris, and mineral musk creates a powerful, unforgettable presence.",
    notes: {
      top: ["Sea Salt", "Ozonic Notes", "Bergamot"],
      heart: ["Iris", "Cyclamen", "Water Lily"],
      base: ["Driftwood", "Ambergris", "Mineral Musk"]
    },
    price: "$225",
    size: "50ml"
  },
  {
    name: "REVERIE",
    description: "A dreamy composition that blurs the line between reality and imagination",
    longDescription: "Reverie transports you to a world of dreams with its ethereal blend of soft florals and powdery musks. Opening with delicate pear and pink pepper, it unfolds into a heart of peony and cashmere wood, finishing with a cloud-like base of white musk and soft vanilla.",
    notes: {
      top: ["Pear", "Pink Pepper", "Aldehydes"],
      heart: ["Peony", "Cashmere Wood", "Rose Petals"],
      base: ["White Musk", "Soft Vanilla", "Powdery Notes"]
    },
    price: "$185",
    size: "50ml"
  }
];

export default function CollectionPage() {
  const collectionRef = useRef(null);
  const isCollectionInView = useInView(collectionRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navigation />
      
      <PageHeader 
        title="COLLECTION" 
        subtitle="Discover our signature fragrances, each a masterpiece of olfactory artistry"
      />

      <section ref={collectionRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCollectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wider mb-6">
              SIGNATURE FRAGRANCES
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">
              Six distinct compositions, each capturing a different facet of nature's beauty
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isCollectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-light tracking-wider">
                        {product.name}
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-light tracking-widest mb-3">{product.name}</h3>
                    <p className="text-white/70 font-light mb-6 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="mb-6 text-left">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs tracking-wide text-white/50 mb-2 uppercase">Top Notes</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.notes.top.map((note) => (
                              <span
                                key={note}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs font-light"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xs tracking-wide text-white/50 mb-2 uppercase">Heart Notes</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.notes.heart.map((note) => (
                              <span
                                key={note}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs font-light"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xs tracking-wide text-white/50 mb-2 uppercase">Base Notes</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.notes.base.map((note) => (
                              <span
                                key={note}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs font-light"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-xl font-light tracking-wide">{product.price}</div>
                      <div className="text-sm text-white/60 font-light">{product.size}</div>
                    </div>
                    
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

          {/* Collection Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCollectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-32 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-extralight tracking-wider mb-8">OUR PHILOSOPHY</h3>
              <p className="text-white/70 font-light leading-relaxed mb-8">
                Each fragrance in our collection represents a different moment in nature's eternal dance. 
                From the gentle awakening of Aurora to the powerful energy of Tempest, we capture 
                the full spectrum of natural beauty in crystalline clarity.
              </p>
              <p className="text-white/60 font-light leading-relaxed text-sm">
                Crafted with the finest ingredients and aged to perfection, our fragrances are 
                designed to evolve with you throughout the day, revealing new facets with each wear.
              </p>
            </div>
          </motion.div>
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
