import React from "react";
import "./InfoUsuario.css";
import { IconButton, Typography } from "@mui/material";
import { Usuario } from "../../interfaces/Usuarios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { corPrimaria } from "../../util/stylesData";

interface UsuarioComponent {
	usuario: Usuario;
	onUserSelect: () => void;
	onExpandClick: () => void;
}

const InfoUsuario: React.FC<UsuarioComponent> = ({ usuario, onExpandClick }) => {
	return (
		<div className="container-info" onClick={onExpandClick}>
			{" "}
			{/* Aqui o onClick vai expandir o modal */}
			<div className="div-icon-user">
				<AccountCircleIcon sx={{ color: corPrimaria, height: 40, width: 40 }} />
				<IconButton
					className="expand-icon"
					onClick={onExpandClick} // Call the parent's modal open function
					sx={{ position: "absolute", top: 8, right: 8 }}
				>
					<OpenInFullIcon sx={{ color: corPrimaria, height: 15, width: 15 }} />
				</IconButton>
			</div>
			<div className="div-dados-user">
				<Typography>{usuario.name}</Typography>
				<Typography>{usuario.phone_number}</Typography>
			</div>
		</div>
	);
};

export default InfoUsuario;
