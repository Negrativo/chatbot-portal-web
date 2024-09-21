import { Chats } from "../interfaces/Conversas";
import api from "./api";

export const buscarConversas = async (): Promise<Chats> => {
    try {
        const response = await api.get(`/conversa/buscar`);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {conversations: []};
    }
  };