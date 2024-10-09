import React, { useContext, useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./Medicos.css";
import { buscarMedicos, excluirMedico } from "../../services/medicoService";
import { Medico, Medicos } from "../../interfaces/Medicos";
import InfoMedico from "../../components/InfoMedico/InfoMedico";

type Props = {};

const medicosNUll = {
	medicos: [],
};

const UsuariosPage: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);

	const [medicos, setMedicos] = useState<Medico[]>();
	const [medicoSelecionado, setMedicoSelecionado] = useState<Medico>();
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleOpenModal = (usuario: Medico) => {
		setMedicoSelecionado(usuario);
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
		if (medicoSelecionado?.id) {
			excluirMedico(medicoSelecionado.id.toString());
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
				const data = await buscarMedicos();
				console.log(data);
				setMedicos(data);
			} catch (error) {
				triggerNotification("Erro ao buscar conversas!", "error");
			}
		};

		loadGrafico();
	}, [triggerNotification, user, navigate]);

	return (
		<div className="container padding-20">
			<div style={{ width: "100%", height: "100%" }}>
				<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
					Médicos
				</Typography>
				<div className="user-list">
					{!!medicos &&
						medicos.map((medico) => (
							<InfoMedico
								key={medico.id}
								medico={medico}
								onUserSelect={() => handleOpenModal(medico)}
								onExpandClick={() => handleOpenModal(medico)}
							/>
						))}
				</div>

				{!!medicoSelecionado && (
					<Modal open={open} onClose={handleCloseModal}>
						<Box className="modal-box">
							<div className="header cor-primaria">
								<h2>Detalhes do Médico</h2>
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
								<Typography>Nome: {medicoSelecionado.nome}</Typography>
								<Typography>Especialidade: {medicoSelecionado.categoria.nome}</Typography>
							</div>
						</Box>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default UsuariosPage;
