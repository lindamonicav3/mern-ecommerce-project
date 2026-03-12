import axios from '../utils/axiosInstance';

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

// Get single product by ID
export const getProductById = async id => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

// Create products (Admin)
export const createProduct = async productData => {
  const response = await axios.post('/product', productData);
  return response.data;
};

// Upload image (Admin)
export const imageUpload = async imageData => {
  const response = await axios.post('/image-upload', imageData);
  return response.data;
};

// Update products (Admin)
export const updateProduct = async (id, data) => {
  const response = await axios.put(`/product/${id}`, data);
  return response.data;
};

// Delete products (Admin)
export const deleteProduct = async id => {
  const response = await axios.delete(`/product/${id}`);
  return response.data;
};
