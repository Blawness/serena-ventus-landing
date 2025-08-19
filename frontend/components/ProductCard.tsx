import { motion } from 'framer-motion';
import type { Product } from '~backend/cms/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  onDiscover?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onDiscover }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
            <div className="text-xl font-light tracking-wide">${product.price}</div>
            {product.size && (
              <div className="text-sm text-white/60 font-light">{product.size}</div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDiscover?.(product)}
            className="w-full py-3 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-light tracking-widest"
          >
            DISCOVER
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
