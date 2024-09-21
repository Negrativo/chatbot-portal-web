import api from "./api";
import { Chat, Conversations } from "../interfaces/Conversas";
import {Agendamentos} from '../interfaces/Agendamento';

interface conversasReturn {
  conversations: Conversations[]
}

interface chatReturn {
  conversations: Chat[];
}

export const buscarConversas = async (): Promise<chatReturn> => {
  try {
      const response = await api.get(`/conversa/buscar`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {conversations: []};
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