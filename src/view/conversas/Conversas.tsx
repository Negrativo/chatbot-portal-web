import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarConversas, buscarEventos } from "../../services/dashboardService";
import { Chat } from "../../interfaces/Conversas";
import CircularProgress from "@mui/material/CircularProgress";
import { Eventos } from "../../interfaces/Eventos";
import "./Conversas.css";
import ConversaComponent from "../../components/Conversa/conversa";

type Props = {};

const Conversas: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [chats, setChats] = useState<Chat[]>([]);
	const [eventos, setEventos] = useState<Eventos>({ eventos: [] });
	const [isLoading, setIsLoading] = useState(false);
	const [selectedChat, setSelectedChat] = useState<number | null>(null);

	const navigate = useNavigate();

	const conversations = [
		{ id: 1, name: "Felipe Silva", message: "Quero saber o preço final com o desconto por favor." },
		{ id: 2, name: "Christina Garcia", message: "Ok, valeu" },
		{ id: 3, name: "Sara Fernandez", message: "Assim funciona pra vocês?" },
		// Adicione mais conversas conforme necessário
	];

	const messages = [
		{ id: 1, user: "Felipe Silva", time: "15:05", text: "Olá, quero comprar uma de suas cadeiras" },
		{
			id: 2,
			user: "Elena Maria",
			time: "15:05",
			text: "Certo! Você pode escolher entre três cores: roxo, azul, vermelho.",
		},
		{
			id: 3,
			user: "Felipe Silva",
			time: "15:05",
			text: "Bacana. Há algum desconto? Essa promoção no site se aplica?",
		},
		// Adicione mais mensagens conforme necessário
	];

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
				setChats(data.chats);
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

	const handleChatSelect = (chatId: number) => {
		setSelectedChat(chatId);
	};

	return (
		<div className="container">
			<Paper sx={{ width: "100%", mb: 2 }}>
				{isLoading ? (
					<div className="loadingContainer">
						<CircularProgress />
						<Typography>Buscando conversas</Typography>
					</div>
				) : chats.length > 0 ? (
					<div className="chat-container">
						<div className="chat-sidebar">
							<div className="chat-header">
								<h3>Central de Atendimento</h3>
							</div>
							<div className="chat-list">
								{conversations.map((conversation) => (
									<ConversaComponent
										key={conversation.id}
										conversation={conversation}
										onChatSelect={handleChatSelect}
										selectedChatId={selectedChat}
									/>
								))}
							</div>
						</div>
						<div className="chat-content">
							{selectedChat ? (
								<div className="messages">
									{messages.map((message) => (
										<div key={message.id} className="message">
											<div className="message-header">
												<span className="message-user">{message.user}</span>
												<span className="message-time">{message.time}</span>
											</div>
											<div className="message-text">{message.text}</div>
										</div>
									))}
								</div>
							) : (
								<div className="no-chat-selected">Selecione uma conversa para ver as mensagens.</div>
							)}
						</div>
					</div>
				) : (
					<Typography>Não foram encontradas conversas recentes.</Typography>
				)}
			</Paper>
		</div>
	);
};

export default Conversas;
