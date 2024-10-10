import { ICategoriaAtendimento } from '../interfaces/CategoriaAtendimento';
import { MensagemReturn } from '../interfaces/MensagemReturn';
import api from "./api";

export const categoriaAtendimentoService = {
  
  async listarCategorias(): Promise<ICategoriaAtendimento[]> {
    try {
      const response = await api.get(`/categoriaAtendimentos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar as categorias', error);
      throw error;
    }
  },

  async criarCategoria(nome: string): Promise<ICategoriaAtendimento> {
    try {
      const response = await api.post(`/categoriaAtendimento/cadastrar`, { nome });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar a categoria', error);
      throw error;
    }
  },

  async atualizarCategoria(id: number, nome: string): Promise<ICategoriaAtendimento> {
    try {
      const response = await api.put(`/categoriaAtendimento/atualizar/${id}`, { nome });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar a categoria', error);
      throw error;
    }
  },

  async deletarCategoria(id: number): Promise<MensagemReturn> {
    try {
      const response = await api.delete(`/categoriaAtendimento/deletar/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar a categoria', error);
      throw error;
    }
  },

  async buscarCategoriaPorId(id: number): Promise<ICategoriaAtendimento> {
    try {
      const response = await api.get(`/categoriaAtendimento/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar a categoria', error);
      throw error;
    }
  },

  async listarCategoriasComMedicos(): Promise<ICategoriaAtendimento[]> {
    try {
      const response = await api.get(`/categoriasComMedicos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar as categorias com médicos', error);
      throw error;
    }
  }
};
