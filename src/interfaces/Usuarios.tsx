export interface Usuarios {
	users: Usuario[];
}

export interface Usuario {
	id: number;
	name: string;
	email: string;
	adminId: number;
	cpf: string;
	phone_number: string;
	observation: string;
}
