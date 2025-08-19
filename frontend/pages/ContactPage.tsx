import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import CMSContent from '../components/CMSContent';
import { usePage } from '../hooks/useCMS';

export default function ContactPage() {
  const { page, loading } = usePage('contact');
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

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
        title={page?.title || "CONTACT"} 
        subtitle={page?.subtitle || "Connect with us for personalized consultations and exclusive experiences"}
      />

      <section ref={contactRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* CMS Content */}
              {page?.content && (
                <CMSContent content={page.content} />
              )}

              <div className="space-y-8">
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

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-light tracking-wide mb-2">HOURS</h3>
                    <div className="text-white/70 font-light text-sm space-y-1">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 12:00 PM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
            >
              <h3 className="text-2xl font-light tracking-wide mb-8">SEND A MESSAGE</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-white/60 focus:outline-none transition-colors font-light"
                    required
                  >
                    <option value="" className="bg-[#141414]">Select Subject</option>
                    <option value="consultation" className="bg-[#141414]">Private Consultation</option>
                    <option value="product" className="bg-[#141414]">Product Inquiry</option>
                    <option value="custom" className="bg-[#141414]">Custom Fragrance</option>
                    <option value="partnership" className="bg-[#141414]">Partnership</option>
                    <option value="other" className="bg-[#141414]">Other</option>
                  </select>
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/50 focus:border-white/60 focus:outline-none transition-colors font-light resize-none"
                    required
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 text-sm font-light tracking-widest flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "PRIVATE CONSULTATIONS",
                description: "One-on-one sessions with our fragrance experts to discover your perfect scent profile.",
                duration: "60 minutes"
              },
              {
                title: "CUSTOM FRAGRANCES",
                description: "Create a bespoke fragrance tailored exclusively to your preferences and personality.",
                duration: "3-6 months"
              },
              {
                title: "FRAGRANCE WORKSHOPS",
                description: "Learn the art of perfumery in intimate group sessions led by master perfumers.",
                duration: "2 hours"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center"
              >
                <h3 className="text-lg font-light tracking-wide mb-4">{service.title}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-white/50 font-light text-xs tracking-wide">
                  Duration: {service.duration}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20"
          >
            <div className="aspect-[16/9] bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className="text-white/50 font-light">Interactive map coming soon</p>
              </div>
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
