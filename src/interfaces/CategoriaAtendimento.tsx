export interface ICategoriaAtendimento {
	id: number;
	nome: string;
	doutores?: {
		id: number;
		nome: string;
	}[];
}

export interface CategoriaAtendimento {
	id: number;
	nome: string;
}

export interface CriarCategoriaAtendimento {
	nome: string;
}
