import { useNavigate } from 'react-router-dom';
import { HOST_URL } from '../constant/api.contant';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: HOST_URL,
  headers: {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    let user: any = localStorage.getItem('admin');
    // let user: any = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      const token = user.token;
      const auth = token ? `Bearer ${token}` : '';
      config.headers['Authorization'] = auth;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // localStorage.removeItem('user');
    // window.location.href = '/login';
    return Promise.reject(error);
  }
);

export default axiosInstance;
