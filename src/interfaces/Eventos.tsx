export interface Eventos {
	eventos: Evento[];
}

export interface Evento {
	id: string;
	cpfUser: string;
	nomeUser: string;
	dataInicial: string;
	dataFinal: string;
	codEvento: string;
	createdAt: string;
	updatedAt: string;
}
