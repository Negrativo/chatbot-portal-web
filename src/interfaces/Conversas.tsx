export interface Conversations {
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

// export interface Chat {
// 	id: string;
// 	createdAt: string;
// 	slots: {
// 		[key: string]: string[];
// 	};
// 	intent_names: string[];
// }
