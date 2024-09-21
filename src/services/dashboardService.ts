import api from "./api";
import { EstatisticaDash } from "../interfaces/EstatisticaDash";

export const buscarDadosGrafico = async (): Promise<EstatisticaDash> => {
  try {
      const response = await api.get(`/dashboard/grafico`);
      console.log(response.data)
      return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    return {agendamentos: {mesAnterior: 0, mesAtual: 0}, conversas:{mesAnterior: 0, mesAtual: 0}};
  }
};