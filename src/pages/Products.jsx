import React from 'react';
import ProductTable from '../components/ProductTable';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductForm from '../components/ProductForm';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/features/productsSlice';

const Products = () => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent sm:text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => setIsAddOpen(true)}
            >
              <FiPlus /> Add Product
            </motion.button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ProductTable />
        </div>
      </main>

      <ProductForm
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        isEdit={false}
      />
    </div>
  );
};

export default Products;