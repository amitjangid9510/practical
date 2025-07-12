import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, addProduct } from '../store/features/productsSlice';
import { Dialog, Transition } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  image: yup.string().url('Must be a valid URL').required('Image URL is required'),
  rating: yup.object().shape({
    rate: yup
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating cannot exceed 5')
      .required('Rating is required'),
    count: yup
      .number()
      .integer('Review count must be an integer')
      .min(0, 'Review count cannot be negative')
      .required('Review count is required')
  })
});

const ProductForm = ({ isOpen, setIsOpen, product, isEdit = false }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: product || {
      title: '',
      price: '',
      description: '',
      category: 'electronics',
      image: '',
      rating: {
        rate: 0,
        count: 0
      }
    },
  });

  const onSubmit = (data) => {
    
    const productData = {
      ...data,
      price: Number(data.price),
      rating: {
        rate: Number(data.rating.rate),
        count: Number(data.rating.count)
      }
    };
    console.log("🚀 ~ onSubmit ~ productData:", productData)

    if (isEdit) {
      dispatch(updateProduct({ id: product.id, productData }));
    } else {
      dispatch(addProduct(productData));
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      reset(
        product || {
          title: '',
          price: '',
          description: '',
          category: 'electronics',
          image: '',
          rating: {
            rate: 0,
            count: 0
          }
        }
      );
    }
  }, [isOpen, product, reset]);

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    {isEdit ? 'Edit Product' : 'Add New Product'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Title*
                        </label>
                        <input
                          {...register('title')}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter product title"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)*
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('price')}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.price ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category*
                        </label>
                        <select
                          {...register('category')}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="electronics">Electronics</option>
                          <option value="jewelery">Jewelery</option>
                          <option value="men's clothing">Men's Clothing</option>
                          <option value="women's clothing">Women's Clothing</option>
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL*
                        </label>
                        <input
                          {...register('image')}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.image ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating (0-5)*
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            {...register('rating.rate')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.rating?.rate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.rating?.rate && (
                            <p className="mt-1 text-sm text-red-600">{errors.rating.rate.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reviews Count*
                          </label>
                          <input
                            type="number"
                            min="0"
                            {...register('rating.count')}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.rating?.count ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.rating?.count && (
                            <p className="mt-1 text-sm text-red-600">{errors.rating.count.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      rows={4}
                      {...register('description')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter detailed product description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-2">
                    <button
                      type="button"
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isEdit ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductForm;