import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-6">
            GET IN TOUCH
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Experience our fragrances in person or reach out for personalized consultations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-light tracking-wide mb-2">FLAGSHIP BOUTIQUE</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed">
                  123 Madison Avenue<br />
                  New York, NY 10016<br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-light tracking-wide mb-2">PHONE</h3>
                <p className="text-white/70 font-light text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-light tracking-wide mb-2">EMAIL</h3>
                <p className="text-white/70 font-light text-sm">hello@serenaventus.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
          >
            <h3 className="text-xl font-light tracking-wide mb-6">SEND A MESSAGE</h3>
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-light tracking-widest"
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 pt-12 border-t border-white/10"
        >
          <p className="text-white/40 font-light text-sm tracking-wide">
            © 2024 SERENA VENTUS. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
