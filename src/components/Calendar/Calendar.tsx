import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../Modal/Modal";
import { Agendamentos } from "../../interfaces/Agendamento";
import { Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
	title: string;
	start: Date;
	end: Date;
}

const CalendarComponent: React.FC<Agendamentos> = ({ agendamentos }) => {
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

	console.log(agendamentos);
	moment.locale("pt-br");

	const messages = {
		allDay: "Dia inteiro",
		previous: "<",
		next: ">",
		today: "Hoje",
		month: "Mês",
		week: "Semana",
		day: "Dia",
		agenda: "Agenda",
		date: "Data",
		time: "Hora",
		event: "Evento",
		noEventsInRange: "Nenhum evento neste intervalo.",
		showMore: (total: any) => `+ Ver mais (${total})`,
	};

	useEffect(() => {
		const parsedEvents = agendamentos.map((evento) => ({
			start: new Date(evento.dataInicial),
			end: new Date(evento.dataFinal),
			title: evento.nomeUser,
		}));
		setEvents(parsedEvents);
	}, [agendamentos]);

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedEvent(event);
	};

	const closeModal = () => {
		setSelectedEvent(null);
	};

	return (
		<div style={{ height: "100%" }}>
			<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
				Agendamentos
			</Typography>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "90%" }}
				onSelectEvent={handleSelectEvent}
				messages={messages}
			/>

			<Modal show={!!selectedEvent} onClose={closeModal}>
				{selectedEvent && (
					<>
						<h2>Detalhes do Agendamento</h2>
						<p>Paciente: {selectedEvent.title}</p>
						<p>
							Consulta agendada entre {moment(selectedEvent.start).format("LL")} e{" "}
							{moment(selectedEvent.end).format("LL")}
						</p>
						{/* Adicione mais detalhes conforme necessário */}
					</>
				)}
			</Modal>
		</div>
	);
};

export default CalendarComponent;
