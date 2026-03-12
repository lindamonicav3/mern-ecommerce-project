import axios from '../utils/axiosInstance';

// Get all users (Admin)
export const getAllUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

// Delete users (Admin)
export const deleteUser = async id => {
  const response = await axios.delete(`/users/${id}`);
  return response.data;
};
