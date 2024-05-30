import api from "./api";
import { Chat } from "../interfaces/Conversas";

interface conversasReturn {
    chats: Chat[]
}

export const buscarConversas = async (): Promise<conversasReturn> => {
  try {
      const response = await api.get(`/chat/buscarConversas`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {chats: []};
  }
};