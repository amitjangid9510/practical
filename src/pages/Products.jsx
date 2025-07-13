import React, { useEffect, useState } from 'react';
import ProductTable from '../components/ProductTable';
import { FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductForm from '../components/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSearchTerm, 
  setCategoryFilter,
  fetchCategories,
  clearSelectedProduct
} from '../store/features/productsSlice';
import { selectCategories } from '../store/features/productsSlice';

const Products = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const selectedProduct = useSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setIsEditModalOpen(true);
    }
  }, [selectedProduct]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
    setIsCategoryOpen(false);
  };

  const handleCloseCategoryDropdown = (e) => {
    if (!e.target.closest('.category-dropdown')) {
      setIsCategoryOpen(false);
    }
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    dispatch(clearSelectedProduct());
  };

  useEffect(() => {
    if (isCategoryOpen) {
      document.addEventListener('click', handleCloseCategoryDropdown);
    }
    return () => {
      document.removeEventListener('click', handleCloseCategoryDropdown);
    };
  }, [isCategoryOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Product Management</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>
            
            <div className="relative category-dropdown">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
                <FiChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        categoryFilter === 'all' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {Array.isArray(categories) && categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          categoryFilter === category 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm sm:text-base"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" /> 
              <span>Add Product</span>
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
        isOpen={isCreateModalOpen}
        setIsOpen={handleCreateModalClose}
        isEdit={false}
      />

      <ProductForm
        isOpen={isEditModalOpen}
        setIsOpen={handleEditModalClose}
        product={selectedProduct}
        isEdit={true}
      />
    </div>
  );
};

export default Products;