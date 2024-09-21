export interface EstatisticaDash {
	agendamentos: MesGrafico;
	conversas: MesGrafico;
}

export interface MesGrafico {
	mesAtual: number;
	mesAnterior: number;
}
