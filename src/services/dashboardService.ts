import api from "./api";
import { Conversations } from "../interfaces/Conversas";
import {Agendamentos} from '../interfaces/Agendamento';

interface conversasReturn {
    conversations: Conversations[]
}

export const buscarConversas = async (): Promise<conversasReturn> => {
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