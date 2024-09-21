export interface Agendamentos {
	agendamentos: Agendamento[];
}

export interface Agendamento {
	id: number;
	cpfUser: string;
	nomeUser: string;
	dataInicial: string;
	dataFinal: string;
	codAgendamento: string;
	createdAt: string;
	updatedAt: string;
	observation: string;
}

export interface EditAgendamento {
	dataInicial: string;
	dataFinal: string;
	observation: string;
}
