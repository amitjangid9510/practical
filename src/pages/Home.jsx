import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingCart, FiUser, FiLogIn } from 'react-icons/fi';

export default function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated futuristic e-commerce background */}
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
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NEXUS
          </motion.h1>
          
          {user ? (
            <motion.button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Dashboard</span>
              <FiArrowRight />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Sign In</span>
              <FiLogIn />
            </motion.button>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to the Future <br /> of E-Commerce
            </h1>
            
            <motion.p 
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience seamless shopping with our cutting-edge platform powered by AI and blockchain technology.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!user && (
                <>
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiLogIn className="mr-2" />
                    Sign In
                  </motion.button>
                  
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="flex items-center justify-center px-8 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiUser className="mr-2" />
                    Create Account
                  </motion.button>
                </>
              )}
              
              {user && (
                <motion.button
                  onClick={() => navigate('/Home')}
                  className="flex items-center justify-center px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart className="mr-2" />
                  Browse Products
                </motion.button>
              )}
            </div>
          </motion.div>
        </main>

      </div>
    </div>
  );
}