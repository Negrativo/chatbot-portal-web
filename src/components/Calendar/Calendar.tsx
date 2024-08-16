import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../Modal/Modal";
import { Eventos } from "../../interfaces/Eventos";
import { Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
	title: string;
	start: Date;
	end: Date;
}

const CalendarComponent: React.FC<Eventos> = ({ eventos }) => {
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

	console.log(eventos);

	useEffect(() => {
		const parsedEvents = eventos.map((evento) => ({
			start: new Date(evento.dataInicial),
			end: new Date(evento.dataFinal),
			title: evento.nomeUser,
		}));
		setEvents(parsedEvents);
	}, [eventos]);

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
