import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarConversas, buscarAgendamentos } from "../../services/dashboardService";
import { Chat } from "../../interfaces/Conversas";
import CircularProgress from "@mui/material/CircularProgress";
import { Agendamentos } from "../../interfaces/Agendamento";
import "./Conversas.css";
import ConversaComponent from "../../components/Conversa/conversa";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import conversasMock from "../../mock/conversas.json";

type Props = {};

type Conversation = {
	id: number;
	name: string;
	message: string;
};

const Conversas: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [chats, setChats] = useState<Chat[]>([]);
	const [agendamentos, setAgendamentos] = useState<Agendamentos>({ agendamentos: [] });
	const [isLoading, setIsLoading] = useState(false);
	const [selectedChat, setSelectedChat] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [newMessage, setNewMessage] = useState("");

	const navigate = useNavigate();

	const conversations: Conversation[] = conversasMock.conversation as Conversation[];

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

	const handleChatSelect = (chatId: number) => {
		setSelectedChat(chatId);
	};

	const filteredConversations = conversations.filter((conversation) =>
		conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			// Aqui você pode adicionar a lógica para enviar a mensagem
			console.log("Mensagem enviada:", newMessage);
			setNewMessage(""); // Limpa o campo após enviar
		}
	};

	return (
		<div className="container">
			<Paper sx={{ width: "100%", mb: 2 }}>
				{isLoading ? (
					<div className="loadingContainer">
						<CircularProgress />
						<Typography>Buscando conversas</Typography>
					</div>
				) : // ) : chats.length > 0 ? (
				conversations.length > 0 ? (
					<div className="chat-container">
						<div className="chat-sidebar">
							<div className="chat-header">
								<h3>Central de Atendimento</h3>
							</div>
							<div className="search-div">
								<TextField
									placeholder="Buscar"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									variant="outlined"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									}}
									className="search-bar"
								/>
							</div>
							<div className="chat-list">
								{filteredConversations.map((conversation) => (
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
								<div className="chat-block">
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
									<div className="message-input-container">
										<TextField
											placeholder="Digite sua mensagem..."
											variant="outlined"
											fullWidth
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													handleSendMessage();
												}
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<IconButton>
															<AttachFileIcon />
														</IconButton>
													</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position="end">
														<IconButton>
															<SendIcon />
														</IconButton>
													</InputAdornment>
												),
											}}
											className="message-input"
										/>
									</div>
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
