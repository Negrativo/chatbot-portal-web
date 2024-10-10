import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, TextField, Autocomplete } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditMedico, Medico } from "../../interfaces/Medicos";
import { categoriaAtendimentoService } from "../../services/categoriaAtendimentoService";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { corPrimaria } from "../../util/stylesData";
import { atualizarMedico } from "../../services/medicoService";
import { useNotification } from "../../context/NotificationContext";

type MedicoModalProps = {
	open: boolean;
	onClose: () => void;
	medico: Medico | undefined;
	isEditing: boolean;
	onEditClick: (isEdit: boolean) => void;
	onDeleteClick: () => void;
};

const MedicoDetalhes: React.FC<MedicoModalProps> = ({
	open,
	onClose,
	medico,
	isEditing,
	onEditClick,
	onDeleteClick,
}) => {
	const [nome, setNome] = useState(medico?.nome || "");
	const [categoriaSelecionada, setCategoriaSelecionada] = useState(medico?.categoria || null);
	const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);

	const { triggerNotification } = useNotification();

	// Carregar categorias ao abrir o modal
	useEffect(() => {
		if (isEditing) {
			const fetchCategorias = async () => {
				try {
					const response = await categoriaAtendimentoService.listarCategorias();
					console.log(categorias);
					setCategorias(response);
				} catch (error) {
					console.error("Erro ao buscar categorias", error);
				}
			};
			fetchCategorias();
		}
	}, [isEditing]);

	useEffect(() => {
		if (medico) {
			setNome(medico.nome);
			setCategoriaSelecionada(medico.categoria);
		}
	}, [medico]);

	const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNome(event.target.value);
	};

	const handleCategoriaChange = (event: React.ChangeEvent<{}>, newValue: { id: number; nome: string } | null) => {
		setCategoriaSelecionada(newValue);
	};

	if (!medico) return null;

	const clickSave = async () => {
		if (!!nome && !!categoriaSelecionada?.id) {
			const dadosUpdate: EditMedico = {
				nome: nome,
				categoriaId: categoriaSelecionada?.id,
			};

			try {
				const result = await atualizarMedico(medico.id.toString(), dadosUpdate);

				if (result) {
					// Se o retorno contém o ID do médico, assume que foi bem-sucedido
					triggerNotification("Médico atualizado com sucesso", "success");
				} else {
					// Caso contrário, considera que houve um erro
					triggerNotification(result || "Erro ao atualizar médico", "error");
				}
			} catch (error) {
				// Captura erros adicionais
				triggerNotification("Erro ao atualizar médico. Tente novamente.", "error");
			}
		} else {
			triggerNotification("Por favor, preencha todos os campos corretamente", "warning");
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box">
				<div className="header cor-primaria">
					<h2>Detalhes do Médico</h2>
					<div className="icons">
						{!isEditing && (
							<IconButton aria-label="edit" onClick={() => onEditClick(true)}>
								<EditIcon sx={{ color: "white" }} />
							</IconButton>
						)}
						<IconButton aria-label="delete" onClick={onDeleteClick}>
							<DeleteIcon sx={{ color: "white" }} />
						</IconButton>
					</div>
				</div>
				<div className="user-detais-modal">
					{isEditing ? (
						<>
							<TextField
								label="Nome"
								value={nome}
								onChange={handleNomeChange}
								fullWidth
								margin="normal"
							/>
							<Autocomplete
								options={categorias}
								getOptionLabel={(option) => option.nome}
								value={categoriaSelecionada}
								onChange={handleCategoriaChange}
								renderInput={(params) => (
									<TextField {...params} label="Especialidade" fullWidth margin="normal" />
								)}
							/>
						</>
					) : (
						<>
							<Typography>Nome: {medico.nome}</Typography>
							<Typography>Especialidade: {medico.categoria.nome}</Typography>
						</>
					)}
				</div>
				{isEditing ? (
					<div style={{ display: "flex", flexDirection: "row", marginTop: 10, gap: 10 }}>
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
						<div className="botao-salvar">
							<IconButton
								aria-label="save"
								onClick={() => onEditClick(false)}
								sx={{
									backgroundColor: "red",
									color: "#fff",
									borderRadius: "8px",
									padding: "8px 16px",
									"&:hover": {
										backgroundColor: "#15401e",
									},
								}}
							>
								<CancelIcon sx={{ color: "#fff", marginRight: "8px" }} />
								Cancelar
							</IconButton>
						</div>
					</div>
				) : (
					<></>
				)}
			</Box>
		</Modal>
	);
};

export default MedicoDetalhes;
