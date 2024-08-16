import React from "react";
import "./ConversasDash.css";
import { Typography } from "@mui/material";

type Props = {};

interface Conversation {
	conversations: Conversa[];
	onChatSelect: (chatId: number) => void;
}

interface Conversa {
	id: number;
	name: string;
	message: string;
}

const ConversasComponent: React.FC<Conversation> = ({ conversations, onChatSelect }) => {
	const getInitial = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : "";
	};

	const handleChatClick = (numberId: number) => {
		onChatSelect(numberId);
	};
	return (
		<div>
			<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
				Conversas
			</Typography>
			{conversations.map((conversation) => (
				<div key={conversation.id} className={`chat-item`} onClick={() => handleChatClick(conversation.id)}>
					<div className="chat-user-icon">{getInitial(conversation.name)}</div>
					<div className="chat-item-texts">
						<div className="chat-item-name">{conversation.name}</div>
						<div className="chat-item-message">{conversation.message}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ConversasComponent;
