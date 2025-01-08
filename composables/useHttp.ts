// composables/useHttp.ts
import axios from "axios";

export const useHttp = () => {
  // Create an Axios instance with a base URL
  const http = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Handle responses and errors
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Navigate to logout or re-login if unauthorized
        
      }
      return Promise.reject(error);
    }
  );

  return { http };
};
