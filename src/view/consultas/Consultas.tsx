import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import "./Consultas.css";
import { Agendamentos } from "../../interfaces/Agendamento";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import AgendamentoDetalhes from "../../components/AgendamentoDetalhes/AgendamentoDetalhes";
import { CalendarEvent } from "../../interfaces/Calendario";
import { buscarAgendamentos, excluirAgendamento } from "../../services/agendamentoService";

type Props = {};

const localizer = momentLocalizer(moment);

const Consultas: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [agendamentos, setAgendamentos] = useState<Agendamentos>({ agendamentos: [] });
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
				const data = await buscarAgendamentos();
				console.log(data);
				setAgendamentos(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			}
		};

		loadChats();
	}, [triggerNotification, user, navigate]);

	console.log(agendamentos);

	useEffect(() => {
		const parsedEvents = agendamentos.agendamentos.map((evento) => ({
			id: evento.id,
			codAgendamento: evento.codAgendamento,
			paciente: evento.nomeUser,
			observation: evento.observation,
			start: new Date(evento.dataInicial),
			end: new Date(evento.dataFinal),
		}));
		setEvents(parsedEvents);
	}, [agendamentos]);

	const handleSelectEvent = (event: CalendarEvent) => {
		setSelectedEvent(event);
	};

	const handleDelete = async (codAgendamento: string) => {
		try {
			await excluirAgendamento(codAgendamento);
			triggerNotification("Agendamento excluído com sucesso!", "success");
		} catch (error) {
			console.error("Erro ao excluir agendamento:", error);
			triggerNotification("Ocorreu um erro ao excluir o agendamento.", "error");
		}
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
					eventPropGetter={(event) => ({
						style: {
							backgroundColor: "#1C5229",
							color: "white",
						},
					})}
				/>
			</div>
			<div className="consulta-container">
				<AgendamentoDetalhes selectedEvent={selectedEvent} onDelete={handleDelete} />
			</div>
		</div>
	);
};

export default Consultas;
