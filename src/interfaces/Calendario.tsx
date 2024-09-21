import { Event } from "react-big-calendar";

export interface Agendamento {}

export interface CalendarEvent extends Event {
	id: number;
	codAgendamento: string;
	paciente: string;
	observation: string;
	start: Date;
	end: Date;
}
