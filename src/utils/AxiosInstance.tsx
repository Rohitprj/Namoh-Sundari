// // axiosConfig.js
// import axios from 'axios';

// // 1. Create an Axios instance
// //    - baseURL: The base URL for your API. This will be prepended to all relative URLs.
// //      Replace 'YOUR_API_BASE_URL_HERE' with your actual API endpoint.
// //    - timeout: The maximum time in milliseconds a request can take before being aborted.
// //    - headers: Default headers to be sent with every request.
// const axiosInstance = axios.create({
//   baseURL: 'https://shopinger.co.in/api//', // IMPORTANT: Replace with your actual API base URL
//   timeout: 10000, // 10 seconds
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     // You can add other default headers here, e.g., Authorization tokens if they are static
//   },
// });

// // 2. Add a request interceptor
// //    - This interceptor will be executed before every request is sent.
// //    - It's commonly used to add authentication tokens (e.g., JWT) to the headers.
// axiosInstance.interceptors.request.use(
//   async config => {
//     // Example: Get a token from AsyncStorage (or any other secure storage)
//     // import AsyncStorage from '@react-native-async-storage/async-storage';
//     // const token = await AsyncStorage.getItem('userToken');

//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }

//     console.log('Request Interceptor:', config);
//     return config;
//   },
//   error => {
//     // Do something with request error
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   },
// );

// // 3. Add a response interceptor
// //    - This interceptor will be executed for every response (both success and error).
// //    - It's commonly used to handle global errors (e.g., 401 Unauthorized),
// //      refresh tokens, or transform response data.
// axiosInstance.interceptors.response.use(
//   response => {
//     // Any status code that lies in the range of 2xx cause this function to trigger.
//     // Do something with response data
//     console.log('Response Interceptor (Success):', response);
//     return response;
//   },
//   async error => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger.
//     // Do something with response error

//     console.error(
//       'Response Interceptor (Error):',
//       error.response || error.message,
//     );

//     // Example: Handle 401 Unauthorized errors
//     // if (error.response && error.response.status === 401) {
//     //   // Redirect to login, refresh token, etc.
//     //   console.log('Unauthorized request. Redirecting to login...');
//     //   // You might want to navigate to a login screen or dispatch a logout action
//     // }

//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;
// axiosConfig.js
import axios from 'axios';
import {getUserData} from './tokenStorage'; // Import the getUserData function

// 1. Create an Axios instance
//    - baseURL: The base URL for your API. This will be prepended to all relative URLs.
//      Ensure it's correct and ends with a single slash.
//    - timeout: The maximum time in milliseconds a request can take before being aborted.
//    - headers: Default headers to be sent with every request.
const axiosInstance = axios.create({
  baseURL: 'https://shopinger.co.in/api/', // Corrected to end with a single slash
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 2. Add a request interceptor
//    - This interceptor will be executed before every request is sent.
//    - It's used to dynamically add the authentication token to the headers.
axiosInstance.interceptors.request.use(
  async config => {
    try {
      // Get the user data from AsyncStorage
      const userData = await getUserData();

      // If user data exists and contains a token, set the Authorization header
      if (userData && userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    } catch (e) {
      console.error('Error in request interceptor while retrieving token:', e);
      // You might want to handle this error (e.g., log out user if token retrieval consistently fails)
    }

    // console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    // Do something with request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// 3. Add a response interceptor
//    - This interceptor will be executed for every response (both success and error).
//    - It's commonly used to handle global errors (e.g., 401 Unauthorized),
//      refresh tokens, or transform response data.
axiosInstance.interceptors.response.use(
  response => {
    // Any status code that lies in the range of 2xx cause this function to trigger.
    // Do something with response data
    // console.log('Response Interceptor (Success):', response);
    return response;
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger.
    // Do something with response error

    console.error(
      'Response Interceptor (Error):',
      error.response || error.message,
    );

    // Example: Handle 401 Unauthorized errors
    // If you get a 401, it means the token is invalid or expired.
    // You might want to remove the token and redirect to login.
    // import { removeUserData } from './tokenStorage'; // Make sure to import this
    // if (error.response && error.response.status === 401) {
    //   console.log('Unauthorized request. Removing token and potentially redirecting to login...');
    //   await removeUserData(); // Clear stored user data
    //   // You would typically dispatch a logout action or navigate to the login screen here.
    //   // Example for React Navigation: navigation.navigate('Login');
    //   // For Expo Router: router.replace('/login');
    // }

    return Promise.reject(error);
  },
);

export default axiosInstance;
