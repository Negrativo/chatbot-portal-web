import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recuperarSenha, solitcitarTokenSenha } from "../../services/loginService";
import { useNotification } from "../../context/NotificationContext";
import Lottie from "react-lottie";
import "./recuperarSenha.css";
import axios from "axios";

const RecuperarSenha: React.FC = () => {
	const { triggerNotification } = useNotification();

	const [codigo, setCodigo] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [animationData, setAnimationData] = useState(null);
	const [codigoSolicitado, setCodigoSolicitado] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("/AnimationRecuperarSenha.json").then((response) => {
			setAnimationData(response.data);
		});
	}, []);

	const handleCodigoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCodigo(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSenha(event.target.value);
	};

	async function handleSolicitaToken() {
		if (validaDadosSolicitaToken()) {
			const loginData = await solitcitarTokenSenha(email);
			const mensagem = loginData.message || "Ocorreu um erro inesperado!";
			triggerNotification(mensagem, "info");
			setCodigoSolicitado(true);
		}
	}

	async function handleRecuperarSenha() {
		if (validaDadosRecuperarSenha()) {
			const loginData = await recuperarSenha(codigo, email);
			const mensagem = loginData.message || "Ocorreu um erro inesperado!";
			triggerNotification(mensagem, "info");
			navigate("/login");
		}
	}

	function validaDadosSolicitaToken() {
		if (!email) {
			triggerNotification("Insira o e-mail de acesso para continuar.", "warning");
			return false;
		}
		return true;
	}

	function validaDadosRecuperarSenha() {
		if (!codigo) {
			triggerNotification("Insira o código de acesso para continuar.", "warning");
			return false;
		}
		if (!senha) {
			triggerNotification("Insira a senha para continuar.", "warning");
			return false;
		}
		return true;
	}

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className="container">
			<Paper className="login-container">
				<div>
					{!codigoSolicitado && (
						<div>
							<Typography variant="subtitle1" gutterBottom>
								Insira o e-mail dados para prosseguir, enviaremos um codigo para recuperação da senha.
							</Typography>
							<TextField label="E-mail" fullWidth onChange={handleEmailChange} margin="normal" />
							<Button variant="outlined" color="primary" fullWidth onClick={handleSolicitaToken}>
								Solicitar código
							</Button>
						</div>
					)}

					{codigoSolicitado && (
						<div>
							<TextField
								label="Codigo"
								type="password"
								onChange={handleCodigoChange}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="Nova senha"
								type="password"
								onChange={handleSenhaChange}
								fullWidth
								margin="normal"
							/>
							<Button variant="outlined" color="primary" fullWidth onClick={handleRecuperarSenha}>
								Alterar Senha
							</Button>
						</div>
					)}
				</div>
			</Paper>
			<div className="lottie-container">
				<Lottie options={defaultOptions} height={400} width={400} />
			</div>
		</div>
	);
};

export default RecuperarSenha;
