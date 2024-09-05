import { Event } from "react-big-calendar";

export interface CalendarEvent extends Event {
	title: string;
	start: Date;
	end: Date;
}
