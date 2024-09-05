import api from "./api";
import { Chat } from "../interfaces/Conversas";
import {Eventos} from '../interfaces/Eventos';

interface conversasReturn {
    chats: Chat[]
}

export const buscarConversas = async (): Promise<conversasReturn> => {
  try {
      const response = await api.get(`/conversa/buscar`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {chats: []};
  }
};


export const buscarEventos = async (): Promise<Eventos> => {
  try {
      const response = await api.get(`/eventos`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {eventos: []};
  }
};