export interface Chat {
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

export interface Chats {
	conversations: Chat[];
}

export interface Conversations {
	id: string;
	createdAt: string;
	slots: {
		[key: string]: string[];
	};
	intent_names: string[];
	created_at: string;
}
