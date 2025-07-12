import React, { useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import { FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductForm from '../components/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setFilter, 
  setCategoryFilter,
  fetchCategories,
  extractCategoriesFromProducts
} from '../store/features/productsSlice';
import { 
  selectCategories,
  selectUniqueCategories 
} from '../store/features/productsSlice';

const Products = () => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const dispatch = useDispatch();
  
  const categoriesFromSelector = useSelector(selectUniqueCategories);
  const categoriesFromState = useSelector(selectCategories);
  const categories = categoriesFromState.length > 0 ? categoriesFromState : categoriesFromSelector;
  
  const categoryFilter = useSelector((state) => state.products.categoryFilter);

  useEffect(() => {
    dispatch(fetchCategories())
      .unwrap()
      .catch(() => {
        dispatch(extractCategoriesFromProducts());
      });
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
    setIsCategoryOpen(false);
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
            
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        categoryFilter === 'all' 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            categoryFilter === category 
                              ? 'bg-gray-100 text-gray-900' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No categories available</div>
                    )}
                  </div>
                </motion.div>
              )}
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