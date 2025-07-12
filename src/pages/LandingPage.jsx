import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiArrowLeft,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBarChart2,
  FiUsers,
  FiShield,
  FiLayers,
  FiClock
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    '/images/Coffee1.jpg',
    '/images/Coffee3.jpg',
    '/images/Coffee4.jpg',
    '/images/Coffee.jpg',
    '/images/Coffee.png',
    '/images/Coffee2.webp',
    '/images/Coffee3.webp',
    '/images/Coffee4.webp',
    '/images/Coffee5.webp',
    '/images/Coffee6.webp',
    '/images/Coffee7.webp',
    '/images/Coffee8.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Futuristic e-commerce background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/70"></div>
      </motion.div>

      {/* Hero Section with Carousel */}
      <section className="relative h-screen max-h-[900px] overflow-hidden z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentSlide]} 
              alt={`Product showcase ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70 flex items-center justify-center">
              <div className="text-center px-4 max-w-4xl">
                <motion.h1 
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  Modern Product Management
                </motion.h1>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
                >
                  Streamline your product catalog with our intuitive management platform
                </motion.p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="flex gap-4 justify-center"
                >
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center shadow-lg"
                  onClick={() => navigate('/products')}>
                    Get Started <FiArrowRight className="ml-2" />
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={() => setCurrentSlide(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all shadow-lg z-20"
        >
          <FiArrowLeft className="text-white text-2xl" />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all shadow-lg z-20"
        >
          <FiArrowRight className="text-white text-2xl" />
        </button>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Powerful tools designed for efficient product management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Product Creation",
              description: "Easily add new products with detailed specifications",
              icon: <FiPlus className="text-3xl" />
            },
            {
              title: "Inventory Control",
              description: "Track stock levels and product availability in real-time",
              icon: <FiBarChart2 className="text-3xl" />
            },
            {
              title: "Bulk Editing",
              description: "Update multiple products simultaneously with ease",
              icon: <FiEdit className="text-3xl" />
            },
            {
              title: "Secure Access",
              description: "Role-based permissions for your team members",
              icon: <FiShield className="text-3xl" />
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/5 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all backdrop-blur-sm border border-white/10"
            >
              <div className="w-16 h-16 rounded-2xl mb-6 bg-white/10 flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Our Product Management Solution?</h2>
              <p className="text-xl text-white/90 mb-8">
                Transform how you manage your product catalog with our intuitive platform
              </p>
              <ul className="space-y-4">
                {[
                  "Centralized product database",
                  "Real-time inventory updates",
                  "Customizable product attributes",
                  "Team collaboration features",
                  "Comprehensive reporting"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-white mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl shadow-md border border-white/10">
              <div className="aspect-w-16 aspect-h-9 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                <FiLayers className="text-6xl text-white/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Revolutionize Your Product Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join businesses worldwide using our platform to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
             onClick={() => navigate('/products')}>
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;