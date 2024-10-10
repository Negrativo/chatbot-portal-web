import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, TextField, Autocomplete } from "@mui/material";
import { EditMedico } from "../../interfaces/Medicos";
import { categoriaAtendimentoService } from "../../services/categoriaAtendimentoService";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { corPrimaria } from "../../util/stylesData";
import { cadastrarMedico } from "../../services/medicoService";
import { useNotification } from "../../context/NotificationContext";
import { CategoriaAtendimento } from "../../interfaces/CategoriaAtendimento";

type MedicoModalProps = {
	open: boolean;
	onClose: () => void;
};

const CriarMedico: React.FC<MedicoModalProps> = ({ open, onClose }) => {
	const [nome, setNome] = useState("");
	const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaAtendimento | null>(null);
	const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);

	const { triggerNotification } = useNotification();

	// Carregar categorias ao abrir o modal
	useEffect(() => {
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
	}, []);

	const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNome(event.target.value);
	};

	const handleCategoriaChange = (event: React.ChangeEvent<{}>, newValue: { id: number; nome: string } | null) => {
		setCategoriaSelecionada(newValue);
	};

	const clickSave = async () => {
		if (!!nome && !!categoriaSelecionada?.id) {
			const dadosMedico: EditMedico = {
				nome: nome,
				categoriaId: categoriaSelecionada?.id,
			};

			try {
				const result = await cadastrarMedico(dadosMedico);

				if (result) {
					// Se o retorno contém o ID do médico, assume que foi bem-sucedido
					triggerNotification("Médico atualizado com sucesso", "success");
					onClose();
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
					<h2>Cadastrar Médico</h2>
				</div>
				<div className="user-detais-modal">
					<TextField label="Nome" value={nome} onChange={handleNomeChange} fullWidth margin="normal" />
					<Autocomplete
						options={categorias}
						getOptionLabel={(option) => option.nome}
						value={categoriaSelecionada}
						onChange={handleCategoriaChange}
						renderInput={(params) => (
							<TextField {...params} label="Especialidade" fullWidth margin="normal" />
						)}
					/>
				</div>
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
							onClick={() => onClose()}
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
			</Box>
		</Modal>
	);
};

export default CriarMedico;
