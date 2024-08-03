import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarConversas, buscarEventos } from "../../services/dashboardService";
import { Chat } from "../../interfaces/Conversas";
import CircularProgress from "@mui/material/CircularProgress";
import CalendarComponent from "../../components/Calendar/Calendar";
import { Eventos } from "../../interfaces/Eventos";
import "./Dashboard.css";
import BlocoDashboard from "../../components/BlocoDashboard/BlocoDashboard";

type Props = {};

const Dashboard: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [eventos, setEventos] = useState<Eventos>({ eventos: [] });
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		console.log(user);
		if (!user) {
			navigate("/login");
			return;
		}

		const loadChats = async () => {
			setIsLoading(true);
			try {
				const data = await buscarEventos();
				console.log(data);
				setEventos(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadChats();
	}, [triggerNotification, user, navigate]);

	return (
		<div className="container padding-20">
			<div>
				<div>
					<Typography className="text-bem-vindo">Olá {user?.name} 👋🏼,</Typography>
				</div>
				{isLoading ? (
					<div className="loadingContainer">
						<CircularProgress />
						<Typography>Buscando consultas agendadas.</Typography>
					</div>
				) : eventos.eventos.length > 0 ? (
					<div className="linha-bloco">
						<BlocoDashboard component={CalendarComponent} componentProps={{ eventos: eventos.eventos }} />
					</div>
				) : (
					<Typography>Não foram encontradas agendamentos.</Typography>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
