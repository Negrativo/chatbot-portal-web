import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, TextField } from "@mui/material";
import { categoriaAtendimentoService } from "../../services/categoriaAtendimentoService";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { corPrimaria } from "../../util/stylesData";
import { useNotification } from "../../context/NotificationContext";
import "./CriarEspecialidades.css";

type MedicoModalProps = {
	open: boolean;
	onClose: () => void;
};

const CriarEspecialidade: React.FC<MedicoModalProps> = ({ open, onClose }) => {
	const [nome, setNome] = useState<string>("");
	const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);

	const { triggerNotification } = useNotification();

	// Carregar categorias ao abrir o modal
	const fetchCategorias = async () => {
		try {
			const response = await categoriaAtendimentoService.listarCategorias();
			console.log(categorias);
			setCategorias(response);
		} catch (error) {
			console.error("Erro ao buscar categorias", error);
		}
	};

	useEffect(() => {
		fetchCategorias();
	}, []);

	const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNome(event.target.value);
	};

	const clickSave = async () => {
		if (!!nome) {
			try {
				const result = await categoriaAtendimentoService.criarCategoria(nome);

				if (result) {
					triggerNotification("Especialidade médica atualizado com sucesso", "success");
					fetchCategorias();
				} else {
					// Caso contrário, considera que houve um erro
					triggerNotification(result || "Erro ao criar especialidade médica", "error");
				}
			} catch (error) {
				// Captura erros adicionais
				triggerNotification("Erro ao atualizar especialidade médica. Tente novamente.", "error");
			}
		} else {
			triggerNotification("Por favor, preencha todos os campos corretamente", "warning");
		}
	};

	const removerCategoria = async (id: number) => {
		try {
			const result = await categoriaAtendimentoService.deletarCategoria(id);

			if (result) {
				triggerNotification("Especialidade médica deletada com sucesso", "success");
				fetchCategorias();
			} else {
				// Caso contrário, considera que houve um erro
				triggerNotification(result || "Erro ao deletar especialidade médica", "error");
			}
		} catch (error) {
			// Captura erros adicionais
			triggerNotification("Erro ao atualizar especialidade médica. Tente novamente.", "error");
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box className="modal-box">
				<div className="header cor-primaria">
					<h2>Cadastrar especialidades médicas</h2>
				</div>
				<div className="user-detais-modal">
					<div className="input-group">
						<TextField
							label="Nome da especialidade médica"
							value={nome}
							onChange={handleNomeChange}
							fullWidth
							margin="normal"
						/>
						<IconButton
							aria-label="add"
							onClick={clickSave}
							sx={{
								backgroundColor: corPrimaria,
								color: "#fff",
								marginLeft: "10px",
								borderRadius: "50%",
								padding: "10px",
								"&:hover": {
									backgroundColor: "#15401e",
								},
							}}
						>
							<SaveIcon />
						</IconButton>
					</div>
					<div className="div-especialidades">
						{categorias.map((categoria) => (
							<div className="especialidade" key={categoria.id}>
								<span>{categoria.nome}</span>
								<button className="remove-btn" onClick={() => removerCategoria(categoria.id)}>
									&#x2716;
								</button>
							</div>
						))}
					</div>
				</div>
			</Box>
		</Modal>
	);
};

export default CriarEspecialidade;
