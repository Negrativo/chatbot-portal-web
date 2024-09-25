import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { Chat, Conversations } from "../../interfaces/Conversas";
import { buscarConversas } from "../../services/conversaService";
import CircularProgress from "@mui/material/CircularProgress";
import ConversaComponent from "../../components/Conversa/conversa";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./Conversas.css";

type Props = {};

const Conversas: React.FC<Props> = (props) => {
	const navigate = useNavigate();

	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);
	const [chats, setChats] = useState<Conversations[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedChat, setSelectedChat] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [newMessage, setNewMessage] = useState("");
	const [conversations, setConversations] = useState<Chat[]>([]);

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

	const handleChatSelect = (chatId: string) => {
		setSelectedChat(chatId);
	};

	const filteredConversations = conversations.filter((conversation) =>
		conversation.sender_id.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			// Aqui você pode adicionar a lógica para enviar a mensagem
			console.log("Mensagem enviada:", newMessage);
			setNewMessage(""); // Limpa o campo após enviar
		}
	};

	const selectedConversation = conversations.find((conversation) => conversation.sender_id === selectedChat);

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
										key={conversation.sender_id}
										conversation={conversation}
										onChatSelect={handleChatSelect}
										selectedChatId={selectedChat}
									/>
								))}
							</div>
						</div>
						<div className="chat-content">
							{selectedChat && selectedConversation ? (
								<div className="chat-block">
									<div className="messages">
										{selectedConversation.conversation_data.messages.map((message, index) => (
											<div
												key={index}
												className={`message ${
													message.type_name === "user" ? "user cor-primaria" : "bot"
												}`}
											>
												<div className="message-header">
													<span
														className={
															message.type_name === "user"
																? `message-user cor-primaria`
																: `message-bot`
														}
													>
														{message.type_name === "user" ? "Usuário" : "Bot"}
													</span>
													<span
														className={
															message.type_name === "user"
																? `message-user cor-primaria`
																: `message-bot`
														}
													>
														{new Date(message.timestamp * 1000).toLocaleTimeString()}
													</span>
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
