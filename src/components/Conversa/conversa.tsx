import React from "react";
import "./conversa.css";

interface Conversation {
	conversation: Conversa;
	onChatSelect: (chatId: string) => void;
	selectedChatId: string | null;
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

const ConversaComponent: React.FC<Conversation> = ({ conversation, onChatSelect, selectedChatId }) => {
	const getInitial = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : "";
	};

	const handleChatClick = () => {
		onChatSelect(conversation.sender_id);
	};

	const ultimaMensagem = conversation.conversation_data.messages.length - 1;

	return (
		<div
			key={conversation.sender_id}
			className={`chat-item ${selectedChatId === conversation.sender_id ? "active" : ""}`}
			onClick={handleChatClick}
		>
			<div className="chat-user-icon">{getInitial(conversation.sender_id)}</div>
			<div className="chat-item-texts">
				<div className="chat-item-name">{conversation.sender_id}</div>
				<div className="chat-item-message">{conversation.conversation_data.messages[ultimaMensagem].text}</div>
			</div>
		</div>
	);
};

export default ConversaComponent;
