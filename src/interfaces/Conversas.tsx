export interface Chat {
	id: string;
	name: string;
	adminId: string;
	sessionId: string;
	timestamp: string;
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
