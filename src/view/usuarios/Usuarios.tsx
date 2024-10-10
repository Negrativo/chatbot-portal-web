import React, { useContext, useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { buscarUsuarios, excluirUsuario, editarUsuario } from "../../services/usuarioService";
import { Usuario, Usuarios } from "../../interfaces/Usuarios";
import InfoUsuario from "../../components/InfoUsuario/InfoUsuario";
import TextAreaObservacao from "../../components/TextAreaObservacao";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./Usuarios.css";

type Props = {};

const usuarioNUll = {
	users: [],
};

const UsuariosPage: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);

	const [usuarios, setUsuarios] = useState<Usuarios>(usuarioNUll);
	const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario>();
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleOpenModal = (usuario: Usuario) => {
		setUsuarioSelecionado(usuario);
		setOpen(true);
	};

	const handleCloseModal = () => {
		setIsEditing(false);
		setOpen(false);
	};

	const handleEditClick = () => {
		setIsEditing(true); // Ativa o modo de edição
	};

	const handleDelete = () => {
		if (usuarioSelecionado?.id) {
			excluirUsuario(usuarioSelecionado.id.toString());
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		const loadGrafico = async () => {
			try {
				const data = await buscarUsuarios();
				setUsuarios(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
			}
		};

		loadGrafico();
	}, [triggerNotification, user, navigate]);

	const handleEditUser = () => {
		if (!!usuarioSelecionado) {
			editarUsuario(usuarioSelecionado?.id.toString(), usuarioSelecionado);
		}
	};

	return (
		<div className="container padding-20">
			<div style={{ width: "100%", height: "100%" }}>
				<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
					Pacientes
				</Typography>
				<div className="user-list">
					{!!usuarios &&
						usuarios.users.map((usuario) => (
							<InfoUsuario
								key={usuario.cpf}
								usuario={usuario}
								onUserSelect={() => handleOpenModal(usuario)}
								onExpandClick={() => handleOpenModal(usuario)}
							/>
						))}
				</div>

				{!!usuarioSelecionado && (
					<Modal open={open} onClose={handleCloseModal}>
						<Box className="modal-box">
							<div className="header cor-primaria">
								<h2>Detalhes do paciente</h2>
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
							<div className="user-detais-modal">
								<Typography>Nome: {usuarioSelecionado.name}</Typography>
								<Typography>Telefone: {usuarioSelecionado?.phone_number}</Typography>
								<Typography>E-mail: {usuarioSelecionado?.email}</Typography>
								<Typography>CPF: {usuarioSelecionado.cpf}</Typography>
								<TextAreaObservacao
									observationText={usuarioSelecionado.observation}
									handleSave={() => {}}
									isEditing={isEditing}
								/>
							</div>
						</Box>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default UsuariosPage;
