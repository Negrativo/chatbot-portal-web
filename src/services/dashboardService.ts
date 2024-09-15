import api from "./api";
import { Chat } from "../interfaces/Conversas";
import {Agendamentos} from '../interfaces/Agendamento';

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


export const buscarAgendamentos = async (): Promise<Agendamentos> => {
  try {
      const response = await api.get(`/agendamentos`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {agendamentos: []};
  }
};