import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const accesToken = localStorage.getItem("accesToken");
    if (!accesToken) {
      return config;
    }
   config.headers.Authorization = `Bearer ${accesToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          const newToken = response.data.data.accesToken;
          localStorage.setItem("accesToken" , newToken);
         axios.defaults.headers.common["Authorization"] = `Bearar ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.log(refreshError)
        localStorage.removeItem("accesToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export { api };

