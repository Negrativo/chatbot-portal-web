import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Box, Typography } from "@mui/material";
import { Agendamentos } from "../../interfaces/Agendamento";
import { corPrimaria } from "../../util/stylesData";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
	paciente: string;
	start: Date;
	end: Date;
}

const CalendarDashComponent: React.FC<Agendamentos> = ({ agendamentos }) => {
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
	const [dataAtual, setDataAtual] = useState<Date>(new Date());

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

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedEvent(event);
	};

	const closeModal = () => {
		setSelectedEvent(null);
	};

	useEffect(() => {
		const parsedEvents = agendamentos.map((evento) => ({
			id: evento.id,
			codAgendamento: evento.codAgendamento,
			paciente: evento.nomeUser,
			observation: evento.observation,
			start: new Date(evento.dataInicial),
			end: new Date(evento.dataFinal),
		}));

		setEvents(parsedEvents);

		// Define a data padrão como a data do primeiro evento ou o dia atual
		if (parsedEvents.length > 0) {
			setDataAtual(new Date(parsedEvents[0].start));
		} else {
			setDataAtual(new Date()); // Se não houver eventos, usa a data atual
		}
	}, [agendamentos]);

	return (
		<div style={{ height: "100%", width: "100%" }}>
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
				defaultDate={dataAtual}
				defaultView="day"
				scrollToTime={new Date()}
				eventPropGetter={(event) => ({
					style: {
						backgroundColor: corPrimaria,
						color: "#FAFAFA",
						height: 20,
					},
				})}
			/>

			<Modal open={!!selectedEvent} onClose={closeModal}>
				<Box className="modal-box">
					{selectedEvent && (
						<>
							<h2>Detalhes do Agendamento</h2>
							<p>Paciente: {selectedEvent.paciente}</p>
							<p>
								Consulta agendada entre {moment(selectedEvent.start).format("LL")} e{" "}
								{moment(selectedEvent.end).format("LL")}
							</p>
							{/* Adicione mais detalhes conforme necessário */}
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default CalendarDashComponent;
