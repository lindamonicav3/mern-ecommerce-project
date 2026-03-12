import axios from '../utils/axiosInstance';

// Get all orders (Admin)
export const getAllOrders = async () => {
  const response = await axios.get('admin/orders');
  return response.data;
};

// Update order status (Admin)
export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`/admin/orders/${id}`, { status });
  return response.data;
};

// Get user's order
export const getUserOrders = async () => {
  const response = await axios.get('/my-orders');
  return response.data;
};

// Create order - COD
export const createOrder = async orderData => {
  const response = await axios.post('/order-cod', orderData);
  return response.data;
};

//Create razorpay
export const createRazorpayOrder = async orderData => {
  const response = await axios.post('/create-razorpay-order', orderData);
  return response.data;
};

//Razorpay Verify
export const razorpayVerify = async orderData => {
  const response = await axios.post('/verify-payment', orderData);
  return response.data;
};
