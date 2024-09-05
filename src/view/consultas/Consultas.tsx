import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import "./Consultas.css";
import { Eventos } from "../../interfaces/Eventos";
import { buscarEventos } from "../../services/dashboardService";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import AgendamentoDetalhes from "../../components/AgendamentoDetalhes/AgendamentoDetalhes";
import { CalendarEvent } from "../../interfaces/Calendario";

type Props = {};

const localizer = momentLocalizer(moment);

const Consultas: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [eventos, setEventos] = useState<Eventos>({ eventos: [] });
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

	const navigate = useNavigate();

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
		console.log(user);
		if (!user) {
			navigate("/login");
			return;
		}

		const loadChats = async () => {
			try {
				const data = await buscarEventos();
				console.log(data);
				setEventos(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			}
		};

		loadChats();
	}, [triggerNotification, user, navigate]);

	console.log(eventos);

	useEffect(() => {
		const parsedEvents = eventos.eventos.map((evento) => ({
			start: new Date(evento.dataInicial),
			end: new Date(evento.dataFinal),
			title: evento.nomeUser,
		}));
		setEvents(parsedEvents);
	}, [eventos]);

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedEvent(event);
	};

	return (
		<div className="container display-column padding-20">
			<div className="calendar-container">
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
			</div>
			<div className="consulta-container">
				<AgendamentoDetalhes selectedEvent={selectedEvent} />
			</div>
		</div>
	);
};

export default Consultas;
