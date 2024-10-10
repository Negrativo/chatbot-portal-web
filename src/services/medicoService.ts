import { MensagemReturn } from "../interfaces/MensagemReturn";
import { EditMedico, Medico } from "../interfaces/Medicos";
import api from "./api";

// Buscar todos os médicos
export const buscarMedicos = async (): Promise<Medico[]> => {
  try {
    const response = await api.get(`/medicos`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    return [];
  }
};

// Buscar médico específico pelo ID
export const buscarMedico = async (idMedico: string): Promise<Medico> => {
  try {
    const response = await api.get(`/medico/${idMedico}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar médico:', error);
    return { id: 0, nome: "", categoria: { id: 0, nome: "" } };
  }
};

// Excluir médico pelo ID
export const excluirMedico = async (idMedico: string): Promise<MensagemReturn> => {
  try {
    const response = await api.delete(`/medico/deletar/${idMedico}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir médico:', error);
    return { message: "Houve um erro ao excluir o médico" };
  }
};

// Atualizar médico
export const atualizarMedico = async (idMedico: string, dadosMedico: EditMedico): Promise<MensagemReturn> => {
  try {
    const response = await api.put(`/medico/atualizar/${idMedico}`, dadosMedico);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar médico:', error);
    return { message: "Houve um erro ao atualizar o médico" };
  }
};

// Cadastrar novo médico
export const cadastrarMedico = async (dadosMedico: EditMedico): Promise<MensagemReturn> => {
  try {
    const response = await api.post(`/medico/cadastrar`, dadosMedico);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar médico:', error);
    return { message: "Houve um erro ao cadastrar o médico" };
  }
};
