import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarAgendamentos } from "../../services/dashboardService";
import CircularProgress from "@mui/material/CircularProgress";
import CalendarComponent from "../../components/Calendar/Calendar";
import { Agendamentos } from "../../interfaces/Agendamento";
import BlocoDashboard from "../../components/BlocoDashboard/BlocoDashboard";
import "./Dashboard.css";
import ConversasComponent from "../../components/ConversasDash/ConversasDash";
import conversasMock from "../../mock/conversas.json";
import BarChartComponent from "../../components/GraficoColuna/GraficoColuna";

type Props = {};

type Conversation = {
	id: number;
	name: string;
	message: string;
};

type MockData = {
	conversation: Conversation[];
};

const mockData = [
	{ name: "Mês atual", qtd: 1000, agendamentos: 400, conversas: 753 },
	{ name: "Mês anterior", qtd: 1000, agendamentos: 398, conversas: 483 },
	// ... mais dados
];

const Dashboard: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [agendamentos, setAgendamentos] = useState<Agendamentos>({ agendamentos: [] });
	const [isLoading, setIsLoading] = useState(false);

	const conversations: Conversation[] = conversasMock.conversation as Conversation[];

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
				const data = await buscarAgendamentos();
				console.log(data);
				setAgendamentos(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
				console.error("Erro ao buscar conversas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadChats();
	}, [triggerNotification, user, navigate]);

	function irParaConversaSelecionada(chatId: number) {}

	return (
		<div className="container padding-20">
			<div>
				<div>
					<Typography className="text-bem-vindo">Olá {user?.name} 👋🏼,</Typography>
				</div>
				<div className="linha-bloco">
					<BlocoDashboard
						component={CalendarComponent}
						componentProps={{ agendamentos: agendamentos.agendamentos }}
					/>
					<BlocoDashboard
						component={ConversasComponent}
						componentProps={{ conversations: conversations, onChatSelect: irParaConversaSelecionada }}
					/>
				</div>
				<div className="linha-bloco">
					<BlocoDashboard component={BarChartComponent} componentProps={{ data: mockData }} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
