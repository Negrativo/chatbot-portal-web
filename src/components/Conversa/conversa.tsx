import React from "react";
import "./conversa.css";

interface Conversation {
	conversation: Conversa;
	onChatSelect: (chatId: number) => void;
	selectedChatId: number | null;
}

interface Conversa {
	id: number;
	name: string;
	message: string;
}

const ConversaComponent: React.FC<Conversation> = ({ conversation, onChatSelect, selectedChatId }) => {
	const getInitial = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : "";
	};

	const handleChatClick = () => {
		onChatSelect(conversation.id);
	};

	return (
		<div
			key={conversation.id}
			className={`chat-item ${selectedChatId === conversation.id ? "active" : ""}`}
			onClick={handleChatClick}
		>
			<div className="chat-user-icon">{getInitial(conversation.name)}</div>
			<div className="chat-item-texts">
				<div className="chat-item-name">{conversation.name}</div>
				<div className="chat-item-message">{conversation.message}</div>
			</div>
		</div>
	);
};

export default ConversaComponent;
