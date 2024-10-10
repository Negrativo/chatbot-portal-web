import React, { useContext, useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import "./Medicos.css";
import { buscarMedicos, excluirMedico } from "../../services/medicoService";
import { Medico } from "../../interfaces/Medicos";
import InfoMedico from "../../components/InfoMedico/InfoMedico";
import MedicoDetalhes from "../../components/MedicoDetalhes/MedicoDetalhes";
import CriarMedico from "../../components/CriarMedico/CriarMedico";
import CriarEspecialidade from "../../components/CriarEspecialidade/CriarEspecialidades";

type Props = {};

const medicosNUll = {
	medicos: [],
};

const UsuariosPage: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);

	const [medicos, setMedicos] = useState<Medico[]>();
	const [medicoSelecionado, setMedicoSelecionado] = useState<Medico>();
	const [openDetalhes, setOpenDetalhes] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [isAdicionarMedicoOpen, setIsAdicionarMedicoOpen] = useState(false);
	const [isOpenEspecialidades, setIsOpenEspecialidades] = useState(false);

	const handleOpenModal = (usuario: Medico) => {
		setMedicoSelecionado(usuario);
		setOpenDetalhes(true);
	};

	const handleCloseModal = () => {
		setIsEditing(false);
		setOpenDetalhes(false);
	};

	const handleEditClick = (isEdit: boolean) => {
		setIsEditing(isEdit);
	};

	const handleDelete = () => {
		if (medicoSelecionado?.id) {
			excluirMedico(medicoSelecionado.id.toString());
		}
	};

	const handleAtualizarLista = () => {
		loadMedicos();
	};

	const handleOpenEspecialidades = () => {
		setIsOpenEspecialidades(false);
	};

	const navigate = useNavigate();

	const loadMedicos = async () => {
		try {
			const data = await buscarMedicos();
			console.log(data);
			setMedicos(data);
		} catch (error) {
			triggerNotification("Erro ao buscar conversas!", "error");
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		loadMedicos();
	}, [triggerNotification, user, navigate]);

	// Filtrando médicos com base no termo de pesquisa
	const medicosFiltrados = medicos?.filter((medico) => medico.nome.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="container padding-20">
			<div style={{ width: "100%", height: "100%" }}>
				<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
					Médicos
				</Typography>
				<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Pesquisar médico"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{ marginRight: "10px" }}
					/>
					<div className="opcoes-medico-button cor-primaria" onClick={handleAtualizarLista}>
						<Typography>Atualizar lista</Typography>
					</div>
					<div className="opcoes-medico-button cor-primaria" onClick={() => setIsAdicionarMedicoOpen(true)}>
						<Typography>Adicionar médico</Typography>
					</div>
					<div className="opcoes-medico-button cor-primaria" onClick={() => setIsOpenEspecialidades(true)}>
						<Typography>Especialidades</Typography>
					</div>
				</div>
				<div className="user-list">
					{!!medicosFiltrados &&
						medicosFiltrados.map((medico) => (
							<InfoMedico
								key={medico.id}
								medico={medico}
								onUserSelect={() => handleOpenModal(medico)}
								onExpandClick={() => handleOpenModal(medico)}
							/>
						))}
				</div>

				{!!medicoSelecionado && (
					<MedicoDetalhes
						open={openDetalhes}
						onClose={handleCloseModal}
						medico={medicoSelecionado}
						isEditing={isEditing}
						onEditClick={handleEditClick}
						onDeleteClick={handleDelete}
					/>
				)}

				{!!isAdicionarMedicoOpen && (
					<CriarMedico open={isAdicionarMedicoOpen} onClose={() => setIsAdicionarMedicoOpen(false)} />
				)}

				{!!isOpenEspecialidades && (
					<CriarEspecialidade open={isOpenEspecialidades} onClose={() => setIsOpenEspecialidades(false)} />
				)}
			</div>
		</div>
	);
};

export default UsuariosPage;
