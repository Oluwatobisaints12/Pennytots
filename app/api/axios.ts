import axios from 'axios';
import { store } from '../redux';
import { ShowAlert } from 'app/providers/toast';


export const MAIN_URL: string =
  // 'http://192.168.1.150:8000';
  'https://pennytot-backend-development.up.railway.app';

export const Axios = axios.create({
  baseURL: MAIN_URL,
  timeout: 10000, //10s api call before ending
  headers: {},
},);

Axios.interceptors.request.use(function (config: any) {
  // console.log('Axios api just called ---', config.url);
  
  const token = store.getState().user?.token;

  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error, 'error from axios')
    if (error.response && error.response.data && error.response.data.message) {
      ShowAlert({ type: 'error', message: error.response.data.message });
    } else {
      // Handle cases where error.response is undefined
      ShowAlert({ type: 'error', message: 'Network Error or Server Not Respondings' });
    }

    // You may want to return a more generic error if error.response is undefined
    return Promise.reject(error?.response ? error.response : 'Network Error');
  },
);

const { get, post, put, delete: destroy } = Axios;
export { get, post, put, destroy };
