import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, addProduct } from '../store/features/productsSlice';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(70, 'Title must be at most 70 characters')
    .test(
      'not-only-numbers',
      'Title cannot be only numbers',
      (value) => isNaN(value)
    ),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : Number(originalValue)
    )
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters')
    .test(
      'not-only-numbers',
      'Description cannot be only numbers',
      (value) => isNaN(value)
    ),
  category: yup.string().required('Category is required'),
  image: yup.string().url('Must be a valid URL').required('Image URL is required'),
});

const ProductForm = ({ isOpen, setIsOpen, product, isEdit = false }) => {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: isEdit ? product : {
      title: '',
      price: '',
      description: '',
      category: 'electronics',
      image: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(isEdit ? product : {
        title: '',
        price: '',
        description: '',
        category: 'electronics',
        image: '',
      });
      setFormKey(prevKey => prevKey + 1);
      setShowSuccess(false);
    }
  }, [isOpen, product, isEdit, reset]);

  const handleCreate = async (productData) => {
    try {
      setLoading(true);
      const result = await dispatch(addProduct(productData));
      if (addProduct.fulfilled.match(result)) {
        setSuccessMessage('Product created successfully!');
        setShowSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 9000);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (productData) => {
    try {
      setLoading(true);
      const result = await dispatch(updateProduct({ id: product.id, productData }));
      if (updateProduct.fulfilled.match(result)) {
         setIsOpen(false);
        setSuccessMessage('Product updated successfully!');
        setShowSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
    };
    
    if (isEdit) {
      handleUpdate(productData);
    } else {
      handleCreate(productData);
    }
  };

  const handleClose = () => {
    reset({
      title: '',
      price: '',
      description: '',
      category: 'electronics',
      image: '',
    });
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel 
                key={formKey}
                className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                {showSuccess ? (
                  <div className="text-center p-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                      <FiCheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                      {successMessage}
                    </h3>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        {isEdit ? 'Edit Product' : 'Add New Product'}
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
                        onClick={handleClose}
                      >
                        <FiX className="h-6 w-6" />
                      </button>
                    </div>

                    <form 
                      key={`form-${formKey}`}
                      onSubmit={handleSubmit(onSubmit)} 
                      className="space-y-6" 
                      noValidate
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Product Title*
                            </label>
                            <input
                              id="title"
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
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                              Price ($)*
                            </label>
                            <input
                              id="price"
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
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                              Category*
                            </label>
                            <select
                              id="category"
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
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                              Image URL*
                            </label>
                            <input
                              id="image"
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
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description*
                        </label>
                        <textarea
                          id="description"
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
                          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {loading && (
                            <svg
                              className="animate-spin h-4 w-4 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                          )}
                          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductForm;