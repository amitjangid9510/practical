// Navbar.js
import { getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi';

export default function Navbar() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-black/80 backdrop-blur-lg border-b border-white/20 py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.div 
          className="font-bold text-white text-xl cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiHome className="text-white" />
          <span className="hidden sm:inline">Product</span>Hub
        </motion.div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hidden md:flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <FiUser className="text-white" />
                <span className="text-sm text-white">
                  Welcome, <span className="font-medium">{currentUser}</span>
                </span>
              </div>
              <motion.button 
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm rounded-lg border border-white/20 text-white hover:bg-white/10 focus:outline-none transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLogOut className="text-white" />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button 
                onClick={() => navigate('/login')}
                className="text-sm text-white/90 hover:text-white focus:outline-none px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button 
                onClick={() => navigate('/signup')}
                className="px-4 py-1.5 text-sm rounded-lg bg-white text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}

function logoutUser() {
  localStorage.removeItem('currentUser');
}