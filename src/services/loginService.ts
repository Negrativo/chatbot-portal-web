import { AxiosError } from "axios";
import api from "./api";
import { Admin } from "../interfaces/Admin";

interface loginReturn {
    message: string,
    token: string,
    adminData?: Admin
}

interface ApiErrorResponse {
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
      const axiosError = error as AxiosError<ApiErrorResponse>;
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