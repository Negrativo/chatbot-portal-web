export interface Medicos {
	medicos: Medico[];
}

export interface Medico {
	id: number;
	nome: string;
	categoria: CategoriaAtendimento;
}

export interface CategoriaAtendimento {
	id: number;
	nome: string;
}
