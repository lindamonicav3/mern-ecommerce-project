import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 3000,
  // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

Instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default Instance;
