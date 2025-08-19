import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import CMSContent from '../components/CMSContent';
import { usePage, useProducts } from '../hooks/useCMS';

export default function CollectionPage() {
  const { page, loading: pageLoading } = usePage('collection');
  const { products, loading: productsLoading } = useProducts();
  const collectionRef = useRef(null);
  const isCollectionInView = useInView(collectionRef, { once: true, margin: "-100px" });

  if (pageLoading || productsLoading) {
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
        title={page?.title || "COLLECTION"} 
        subtitle={page?.subtitle || "Discover our signature fragrances, each a masterpiece of olfactory artistry"}
      />

      <section ref={collectionRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* CMS Content */}
          {page?.content && (
            <CMSContent content={page.content} />
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onDiscover={(product) => {
                  console.log('Discover product:', product);
                  // Could navigate to individual product page
                }}
              />
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
