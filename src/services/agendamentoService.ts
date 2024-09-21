import { Agendamentos, EditAgendamento } from "../interfaces/Agendamento";
import { MensagemReturn } from "../interfaces/MensagemReturn";
import api from "./api";

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
  
export const excluirAgendamento = async (idAgendamento: string): Promise<MensagemReturn> => {
    try {
        const response = await api.delete(`/agendamento/deletar/${idAgendamento}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {message: "Houve um erro ao excluir"};
    }
};

export const editarAgendamento = async (codAgendamento: string, dadosAgendamento: EditAgendamento): Promise<MensagemReturn> => {
    try {
        const response = await api.put(`/agendamento/atualizar/${codAgendamento}`, dadosAgendamento);
        console.log(response.data)
        return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {message: "Houve um erro ao excluir"};
    }
};

