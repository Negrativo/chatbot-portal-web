import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:3010',

  //Usar baseURL abaixo caso use um ambiente front em localhost apontando para back homolog - (CORS)
  //Solicitar acesso cors heroku: https://cors-anywhere.herokuapp.com/corsdemo
  // baseURL: 'https://cors-anywhere.herokuapp.com/http://00.000.00.000:3000/',

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`; // Corrigido para adicionar o token corretamente
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
  }
);

const setAuthToken = (token: string) => {
  if (!!token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

const api = {

  get: (url: string, params?: any) => {
    return instance.get(url, { params });
  },

  post: (url: string, data: any) => {
    return instance.post(url, data);
  },

  put: (url: string, data: any) => {
    return instance.put(url, data);
  },

  delete: (url: string) => {
    return instance.delete(url);
  },
  setAuthToken: setAuthToken,
};

export default api;