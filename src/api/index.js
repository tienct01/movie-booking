import axios from 'axios'

const axiosClient=axios.create({
    baseURL:'https://movie-server.up.railway.app'
})
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

export default axiosClient