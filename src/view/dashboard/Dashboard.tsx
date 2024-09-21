import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarDadosGrafico } from "../../services/dashboardService";
import CalendarDashComponent from "../../components/Calendar/Calendar";
import { Agendamentos } from "../../interfaces/Agendamento";
import BlocoDashboard from "../../components/BlocoDashboard/BlocoDashboard";
import "./Dashboard.css";
import ConversasComponent from "../../components/ConversasDash/ConversasDash";
import BarChartComponent from "../../components/GraficoColuna/GraficoColuna";
import { Chat, Conversations } from "../../interfaces/Conversas";
import { EstatisticaDash } from "../../interfaces/EstatisticaDash";
import { buscarConversas } from "../../services/conversaService";
import { buscarAgendamentos } from "../../services/agendamentoService";

type Props = {};

const mockData = [
	{ name: "Mês atual", qtd: 1000, agendamentos: 400, conversas: 753 },
	{ name: "Mês anterior", qtd: 1000, agendamentos: 398, conversas: 483 },
	// ... mais dados
];

const estatisticaNull: EstatisticaDash = {
	conversas: { mesAnterior: 0, mesAtual: 0 },
	agendamentos: { mesAnterior: 0, mesAtual: 0 },
};

const Dashboard: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [agendamentos, setAgendamentos] = useState<Agendamentos>({ agendamentos: [] });
	const [estatisticaDash, setEstatisticaDash] = useState<EstatisticaDash>(estatisticaNull);
	const [isLoading, setIsLoading] = useState(false);
	const [conversations, setConversations] = useState<Chat[]>([]);

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
				const data = await buscarConversas();
				console.log(data);
				if (data && data.conversations) {
					setConversations(data.conversations);
				} else {
					setConversations([]); // Garante que seja um array
				}
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadChats();
	}, [triggerNotification, user, navigate]);

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

	useEffect(() => {
		console.log(user);
		if (!user) {
			navigate("/login");
			return;
		}

		const loadGrafico = async () => {
			try {
				const data = await buscarDadosGrafico();
				console.log(data);
				setEstatisticaDash(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			}
		};

		loadGrafico();
	}, [triggerNotification, user, navigate]);

	function irParaConversaSelecionada(chatId: number) {}

	return (
		<div className="container padding-20">
			<div style={{ width: "100%", height: "100%" }}>
				<div className="div-bem-vindo">
					<Typography className="text-bem-vindo">Olá {user?.name} 👋🏼,</Typography>
				</div>
				<div className="linha-bloco">
					<BlocoDashboard
						component={CalendarDashComponent}
						componentProps={{ agendamentos: agendamentos.agendamentos }}
					/>
				</div>
				<div className="linha-bloco">
					<BlocoDashboard component={BarChartComponent} componentProps={{ data: mockData }} />
					<BlocoDashboard
						component={ConversasComponent}
						componentProps={{ conversations: conversations, onChatSelect: irParaConversaSelecionada }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
