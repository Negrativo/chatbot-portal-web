import { AxiosError } from "axios";
import api from "./api";
import { Admin } from "../interfaces/Admin";

interface loginReturn {
    message: string,
    token: string,
    adminData?: Admin
}

interface ApiMessageResponse {
  message: string;
}

export const loginWeb = async (login: string, password: string): Promise<loginReturn> => {
  try {
      const response = await api.post(`/login`, { login, password });
      console.log(response.data)
      if (response.data.token) {
        api.setAuthToken(response.data.token)
      }
      return response.data;
  } catch (error) {
      console.error('Error logging in:', error);
      const axiosError = error as AxiosError<ApiMessageResponse>;
      if (axiosError.response) {
          const message = axiosError.response.data.message || 'Error logging in with unknown error';
          console.error('Error logging in:', message);
          return {
              message,
              token: '',
              adminData: undefined
          };
      } else {
          console.error('Error logging in:', axiosError.message);
          return {
              message: axiosError.message || 'Error logging in with unknown error',
              token: '',
              adminData: undefined
          };
      }
  }
};

export const solitcitarTokenSenha = async (email: string): Promise<ApiMessageResponse> => {
    try {
        const response = await api.post(`/SolicitarTokenSenha`, { email });
        console.log(response.data)
        if (response.data.token) {
          api.setAuthToken(response.data.token)
        }
        return response.data;
    } catch (error) {
        console.error('Error send e-mail token in:', error);
        const axiosError = error as AxiosError<ApiMessageResponse>;
        if (axiosError.response) {
            const message = axiosError.response.data.message;
            console.error('Error send e-mail token in:', message);
            return {
                message,
            };
        } else {
            console.error('Error send e-mail token in:', axiosError.message);
            return {
                message: axiosError.message,
    
            };
        }
    }
  };

export const recuperarSenha = async (token: string, newPassword: string): Promise<ApiMessageResponse> => {
    try {
        const response = await api.post(`/recuperarSenha`, { token, newPassword });
        console.log(response.data)
        if (response.data.token) {
          api.setAuthToken(response.data.token)
        }
        return response.data;
    } catch (error) {
        console.error('Error send e-mail token in:', error);
        const axiosError = error as AxiosError<ApiMessageResponse>;
        if (axiosError.response) {
            const message = axiosError.response.data.message;
            console.error('Error send e-mail token in:', message);
            return {
                message,
            };
        } else {
            console.error('Error send e-mail token in:', axiosError.message);
            return {
                message: axiosError.message,
            };
        }
    }
  };