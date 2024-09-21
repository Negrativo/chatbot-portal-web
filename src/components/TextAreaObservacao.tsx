import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { corPrimaria } from "../util/stylesData";

interface TextAreaObservacaoProps {
	observationText: string;
	isEditing: boolean; // Recebe a prop para saber se está em modo de edição
	handleSave: (text: string) => void;
}

const TextAreaObservacao: React.FC<TextAreaObservacaoProps> = ({ observationText, isEditing, handleSave }) => {
	const [observation, setObservation] = useState(observationText || "");

	// Sincroniza o estado local com o valor da prop quando ela mudar
	useEffect(() => {
		setObservation(observationText);
	}, [observationText]);

	const clickSave = () => {
		handleSave(observation);
	};

	return (
		<div className="observation-section">
			<p>Observação:</p>
			{isEditing ? (
				<>
					<textarea
						placeholder="Observação"
						value={observation}
						onChange={(e) => setObservation(e.target.value)}
						rows={3}
						className="textarea"
					/>
					<div className="botao-salvar">
						<IconButton
							aria-label="save"
							onClick={clickSave}
							sx={{
								backgroundColor: corPrimaria,
								color: "#fff",
								borderRadius: "8px",
								padding: "8px 16px",
								"&:hover": {
									backgroundColor: "#15401e",
								},
							}}
						>
							<SaveIcon sx={{ color: "#fff", marginRight: "8px" }} />
							Salvar
						</IconButton>
					</div>
				</>
			) : (
				<p>{observation || "Nenhuma observação."}</p>
			)}
		</div>
	);
};

export default TextAreaObservacao;
