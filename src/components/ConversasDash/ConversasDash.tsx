import React from "react";
import "./ConversasDash.css";
import { Typography } from "@mui/material";

type Props = {};

interface Conversation {
	conversations: Conversa[];
	onChatSelect: (chatId: string) => void;
}

interface Conversa {
	sender_id: string;
	conversation_data: {
		messages: {
			type_name: string;
			text: string;
			timestamp: number;
		}[];
	};
	createdAt: string;
	updatedAt: string;
}

const ConversasComponent: React.FC<Conversation> = ({ conversations, onChatSelect }) => {
	const getInitial = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : "";
	};

	const handleChatClick = (sender_id: string) => {
		onChatSelect(sender_id);
	};

	const getUltimaMensagem = (conversation: Conversa) => {
		console.log(conversation);
		const ultimaMensagem = conversation.conversation_data.messages.length - 1;
		return conversation.conversation_data.messages[ultimaMensagem].text;
	};

	const getNomeConversa = (conversation: Conversa) => {
		return conversation.sender_id;
	};

	return (
		<div>
			<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
				Conversas
			</Typography>
			{conversations.map((conversation) => {
				console.log(conversation);
				if (conversation.sender_id !== null) {
					return (
						<div
							key={conversation.sender_id}
							className={`chat-item`}
							onClick={() => handleChatClick(conversation.sender_id)}
						>
							<div className="chat-user-icon">{getInitial(conversation.sender_id)}</div>
							<div className="chat-item-texts">
								<div className="chat-item-name">{getNomeConversa(conversation)}</div>
								<div className="chat-item-message">{getUltimaMensagem(conversation)}</div>
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
};

export default ConversasComponent;
