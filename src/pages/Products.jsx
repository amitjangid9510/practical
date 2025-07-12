import React from 'react';
import ProductTable from '../components/ProductTable';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductForm from '../components/ProductForm';

const Products = () => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
            onClick={() => setIsAddOpen(true)}
          >
            <FiPlus /> Add Product
          </motion.button>
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