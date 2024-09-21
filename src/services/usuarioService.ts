
import { MensagemReturn } from "../interfaces/MensagemReturn";
import { Usuario, Usuarios } from "../interfaces/Usuarios";
import api from "./api";

export const buscarUsuarios = async (): Promise<Usuarios> => {
    try {
        const response = await api.get(`/usuario/dados`);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {users: []};
    }
};
  
export const excluirUsuario = async (idUsuario: string): Promise<MensagemReturn> => {
    try {
        const response = await api.delete(`/usuario/deletar/${idUsuario}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {message: "Houve um erro ao excluir"};
    }
};

export const editarAgendamento = async (codAgendamento: string, dadosAgendamento: Usuario): Promise<MensagemReturn> => {
    try {
        const response = await api.put(`/agendamento/atualizar/${codAgendamento}`, dadosAgendamento);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {message: "Houve um erro ao excluir"};
    }
};

