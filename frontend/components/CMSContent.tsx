import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface CMSContentProps {
  content: Record<string, any>;
  className?: string;
}

export default function CMSContent({ content, className = '' }: CMSContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const renderContent = (data: any, key: string) => {
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    switch (key) {
      case 'hero':
        return (
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                {data.title}
              </motion.h1>
              
              {data.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-lg md:text-xl font-light tracking-wide text-white/80 mb-12 max-w-2xl mx-auto"
                >
                  {data.subtitle}
                </motion.p>
              )}
            </div>
          </section>
        );

      case 'story':
        return (
          <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-8">
                  {data.title}
                </h2>
                
                {data.content && (
                  <div className="space-y-6 text-white/80 font-light leading-relaxed">
                    <p>{data.content}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        );

      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wider mb-6">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-white/60 font-light max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </motion.div>
        );

      case 'info':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-wider mb-8">
                {data.title}
              </h2>
              {data.description && (
                <p className="text-white/70 font-light leading-relaxed">
                  {data.description}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {data.title && (
              <h3 className="text-xl font-light tracking-wide">{data.title}</h3>
            )}
            {data.content && (
              <p className="text-white/70 font-light leading-relaxed">{data.content}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div ref={ref} className={className}>
      {Object.entries(content).map(([key, value]) => (
        <div key={key}>
          {renderContent(value, key)}
        </div>
      ))}
    </div>
  );
}
