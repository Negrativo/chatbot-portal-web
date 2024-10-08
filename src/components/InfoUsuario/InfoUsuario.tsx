import React from "react";
import "./InfoUsuario.css";
import { Typography } from "@mui/material";
import { Usuario } from "../../interfaces/Usuarios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { corPrimaria } from "../../util/stylesData";

interface UsuarioComponent {
	usuario: Usuario;
	onUserSelect: () => void;
	onExpandClick: () => void;
}

const InfoUsuario: React.FC<UsuarioComponent> = ({ usuario, onExpandClick }) => {
	return (
		<div className="container-info">
			{" "}
			{/* Aqui o onClick vai expandir o modal */}
			<div className="div-icon-user">
				<AccountCircleIcon sx={{ color: corPrimaria, height: 90, width: 90 }} />
			</div>
			<div className="div-dados-user">
				<Typography>{usuario.name}</Typography>
				<Typography>{usuario.phone_number}</Typography>
			</div>
			<div className="div-user-details cor-primaria" onClick={onExpandClick}>
				<Typography>Detalhes</Typography>
			</div>
		</div>
	);
};

export default InfoUsuario;
