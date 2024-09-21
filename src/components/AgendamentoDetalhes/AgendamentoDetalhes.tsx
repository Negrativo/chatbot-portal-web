import React, { useEffect, useState } from "react";
import moment from "moment";
import "./AgendamentoDetalhes.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { CalendarEvent } from "../../interfaces/Calendario";
import { editarAgendamento } from "../../services/agendamentoService";
import { useNotification } from "../../context/NotificationContext";
import TextAreaObservacao from "../TextAreaObservacao";

interface AgendamentoDetalhesProps {
	selectedEvent: CalendarEvent | null;
	onDelete: (codAgendamento: string) => void; // função passada como props para deletar
}

const AgendamentoDetalhes: React.FC<AgendamentoDetalhesProps> = ({ selectedEvent, onDelete }) => {
	const { triggerNotification } = useNotification();
	const [isEditing, setIsEditing] = useState(false);
	const [observation, setObservation] = useState(selectedEvent?.observation || "");

	const handleDelete = () => {
		if (selectedEvent) {
			// Chamar a função onDelete passando o código do agendamento
			onDelete(selectedEvent.codAgendamento);
		}
	};

	const handleEditClick = () => {
		setIsEditing(true); // Ativa o modo de edição
	};

	const handleSave = async () => {
		if (selectedEvent) {
			try {
				const dataInicial: string = selectedEvent.start.toUTCString();
				const dataFinal: string = selectedEvent.end.toUTCString();
				const agendamentoEditado = await editarAgendamento(selectedEvent.codAgendamento, {
					dataInicial,
					dataFinal,
					observation,
				});
				console.log(agendamentoEditado);
				triggerNotification("Agendamento atualizado com sucesso!", "success");
				setIsEditing(false);
			} catch (error) {
				console.error("Erro ao atualizar agendamento:", error);
				triggerNotification("Ocorreu um erro ao atualizar o agendamento.", "error");
			}
		}
	};

	useEffect(() => {
		setObservation(selectedEvent ? selectedEvent?.observation : "");
	}, [selectedEvent]);

	return (
		<div className={`agendamento-container ${selectedEvent ? "show" : ""}`}>
			{selectedEvent && (
				<>
					<div className="header cor-primaria">
						<h2>Detalhes do Agendamento</h2>
						<div className="icons">
							{!isEditing && (
								<IconButton aria-label="edit" onClick={handleEditClick}>
									<EditIcon sx={{ color: "white" }} />
								</IconButton>
							)}
							<IconButton aria-label="delete" onClick={handleDelete}>
								<DeleteIcon sx={{ color: "white" }} />
							</IconButton>
						</div>
					</div>
					<div className="content">
						<p>Paciente: {selectedEvent.paciente}</p>
						<p>
							Consulta agendada {moment(selectedEvent.start).format("LLLL")} -{" "}
							{moment(selectedEvent.end).format("LT")}
						</p>

						{/* Bloco de observação */}
						<TextAreaObservacao
							handleSave={handleSave}
							observationText={observation}
							isEditing={isEditing}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default AgendamentoDetalhes;
