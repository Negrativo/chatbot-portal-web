import { CategoriaAtendimento } from "./CategoriaAtendimento";

export interface Medicos {
	medicos: Medico[];
}

export interface Medico {
	id: number;
	nome: string;
	categoria: CategoriaAtendimento;
}

export interface EditMedico {
	nome: string;
	categoriaId: number;
}
