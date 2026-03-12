import axios from '../utils/axiosInstance';

export const signupUser = async data => {
  const response = await axios.post('/user/signup', data);
  return response.data;
};

export const loginUser = async data => {
  const response = await axios.post('/user/login', data);
  return response.data;
};
