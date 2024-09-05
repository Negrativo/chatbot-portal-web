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
					<div className="header">
						<h2>Detalhes do Agendamento</h2>
					</div>
					<div className="content">
						<p>Paciente: {selectedEvent.title}</p>
						<p>
							Consulta agendada entre {moment(selectedEvent.start).format("LL")} e{" "}
							{moment(selectedEvent.end).format("LL")}
						</p>
						{/* Adicione mais detalhes conforme necessário */}
					</div>
				</>
			)}
		</div>
	);
};

export default AgendamentoDetalhes;
