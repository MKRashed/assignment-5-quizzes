import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../api'; // Assuming api is the axios instance
import { useAuth } from './useAuth'; // Assuming useAuth provides the auth context
import localforage from "localforage";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      async (config) => {
        const token = await localforage.getItem('authToken');
        console.log({token});
        
        const authToken = auth?.authToken || token;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the token has expired (401), try refreshing it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const localToken = await localforage.getItem('refreshToken');
            const refreshToken = auth?.refreshToken || localToken;
            console.log({refreshToken});
            
            if (!refreshToken) {
              setAuth({ authToken: null, refreshToken: null });
              return Promise.reject(error);
            }

            // Make API call to refresh the token
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            setAuth({ ...auth, authToken: token });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed', refreshError);
            setAuth({ authToken: null, refreshToken: null });
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component is unmounted
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]); // Ensure this effect runs when auth changes

  return { api };
};

export default useAxios;
