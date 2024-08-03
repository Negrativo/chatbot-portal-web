import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginWeb } from "../../services/loginService";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import Lottie from "react-lottie";
import axios from "axios";
import "./login.css";

const Login: React.FC = () => {
	const { triggerNotification } = useNotification();
	const { loginUser } = useContext(UserContext);

	const [login, setLogin] = useState("");
	const [senha, setSenha] = useState("");
	const [animationData, setAnimationData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("/AnimationLogin.json").then((response) => {
			setAnimationData(response.data);
		});
	}, []);

	const handleCodigoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
	};

	const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSenha(event.target.value);
	};

	async function handleLoginWeb() {
		localStorage.removeItem("token");
		if (validaDados()) {
			const loginData = await loginWeb(login, senha);
			if (loginData.token) {
				if (loginData.adminData) {
					loginUser(loginData.adminData); // Certifique-se que adminData existe
				}
				localStorage.setItem("token", loginData.token);
				triggerNotification("Logado com sucesso!", "success");
				navigate(`/dashboard`);
			} else {
				const mensagem = loginData.message || "Ocorreu um erro inesperado!";
				triggerNotification(mensagem, "error");
			}
		}
	}

	function handleRecuperarSenhaWeb() {
		navigate("/recuperarSenha");
	}

	function validaDados() {
		if (!login) {
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
		<div className="login-container">
			<div className="container-dados-login">
				<div>
					<Typography variant="h4" gutterBottom>
						Bem-vindo ao nosso CRM.
					</Typography>
					<Typography variant="h4" gutterBottom>
						Entre na sua conta e confira as novidades.
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
						Insira seus dados para prosseguir:
					</Typography>
					<TextField label="Login" fullWidth onChange={handleCodigoChange} margin="normal" />
					<TextField label="Senha" type="password" onChange={handleSenhaChange} fullWidth margin="normal" />
					<Button variant="outlined" color="primary" fullWidth onClick={handleLoginWeb}>
						Entrar
					</Button>
					<Button variant="outlined" color="primary" fullWidth onClick={handleRecuperarSenhaWeb}>
						Recuperar senha
					</Button>
				</div>
			</div>
			<div className="lottie-container">
				<Lottie options={defaultOptions} height={400} width={400} />
			</div>
		</div>
	);
};

export default Login;
