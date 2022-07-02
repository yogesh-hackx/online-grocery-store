import axios from 'axios';
// eslint-disable-next-line import/no-cycle
// import { handleLogout } from './auth';

export const baseURL = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Cache-Control': 'max-age=0, must-revalidate',
    },
});

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       handleLogout();
//     }
//     return Promise.reject(err);
//   },
// );

export default api;