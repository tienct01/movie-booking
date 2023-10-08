import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`,
});
axiosClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosClient;
