import React from "react";
import "./InfoMedico.css";
import { Typography } from "@mui/material";
import { Medico } from "../../interfaces/Medicos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { corPrimaria } from "../../util/stylesData";

interface MedicoComponent {
	medico: Medico;
	onUserSelect: () => void;
	onExpandClick: () => void;
}

const InfoMedico: React.FC<MedicoComponent> = ({ medico, onExpandClick }) => {
	return (
		<div className="container-info">
			{" "}
			{/* Aqui o onClick vai expandir o modal */}
			<div className="div-icon-user">
				<AccountCircleIcon sx={{ color: corPrimaria, height: 90, width: 90 }} />
			</div>
			<div className="div-dados-user">
				<Typography>{medico.nome}</Typography>
				<Typography>{medico.categoria.nome}</Typography>
			</div>
			<div className="div-user-details cor-primaria" onClick={onExpandClick}>
				<Typography>Detalhes</Typography>
			</div>
		</div>
	);
};

export default InfoMedico;
