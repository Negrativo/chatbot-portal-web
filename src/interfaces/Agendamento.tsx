export interface Agendamentos {
	agendamentos: Agendamento[];
}

export interface Agendamento {
	id: string;
	cpfUser: string;
	nomeUser: string;
	dataInicial: string;
	dataFinal: string;
	codEvento: string;
	createdAt: string;
	updatedAt: string;
}
