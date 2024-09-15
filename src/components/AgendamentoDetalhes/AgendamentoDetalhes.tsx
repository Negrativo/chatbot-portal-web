import React from "react";
import moment from "moment";
import "./AgendamentoDetalhes.css";
import { CalendarEvent } from "../../interfaces/Calendario";

interface AgendamentoDetalhesProps {
	selectedEvent: CalendarEvent | null;
}

const AgendamentoDetalhes: React.FC<AgendamentoDetalhesProps> = ({ selectedEvent }) => {
	return (
		<div className={`agendamento-container ${selectedEvent ? "show" : ""}`}>
			{selectedEvent && (
				<>
					<div className="header cor-primaria">
						<h2>Detalhes do Agendamento</h2>
					</div>
					<div className="content">
						<p>Paciente: {selectedEvent.title}</p>
						<p>
							Consulta agendada {moment(selectedEvent.start).format("LLLL")} -{" "}
							{moment(selectedEvent.end).format("LT")}
						</p>
						{/* Adicione mais detalhes conforme necessário */}
					</div>
				</>
			)}
		</div>
	);
};

export default AgendamentoDetalhes;
