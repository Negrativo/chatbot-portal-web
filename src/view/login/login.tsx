import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Typography, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginWeb, refreshToken } from "../../services/loginService";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import Lottie from "react-lottie";
import axios from "axios";
import "./login.css";

const Login: React.FC = () => {
	const { triggerNotification } = useNotification();
	const { loginUser } = useContext(UserContext);

	const [login, setLogin] = useState("");
	const [senha, setSenha] = useState("");
	const [animationData, setAnimationData] = useState(null);
	const [manterConectado, setManterConectado] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(11111111111111111111111111111, token);
		if (token) {
			const decodedToken: any = jwtDecode(token);
			const currentTime = Date.now() / 10000;
			console.log(decodedToken);
			// If the token is valid, refresh it
			if (decodedToken.exp > currentTime) {
				refreshToken(token).then((newToken) => {
					if (newToken) {
						localStorage.setItem("token", newToken);
						triggerNotification("Sessão renovada com sucesso!", "success");
						navigate(`/Geral`);
					} else {
						localStorage.removeItem("token");
					}
				});
			} else {
				localStorage.removeItem("token");
			}
		}
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

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setManterConectado(event.target.checked);
	};

	async function handleLoginWeb() {
		localStorage.removeItem("token");
		sessionStorage.removeItem("token");
		if (login && senha) {
			const loginData = await loginWeb(login, senha);
			if (loginData.token) {
				if (loginData.adminData) {
					loginUser(loginData.adminData);
				}
				// Salva o token no localStorage ou sessionStorage baseado no estado do checkbox
				if (manterConectado) {
					localStorage.setItem("token", loginData.token);
				} else {
					sessionStorage.setItem("token", loginData.token);
				}
				triggerNotification("Logado com sucesso!", "success");
				navigate(`/Geral`);
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
					<TextField label="Senha" type="password" fullWidth onChange={handleSenhaChange} margin="normal" />
					<FormControlLabel
						control={<Checkbox checked={manterConectado} onChange={handleCheckboxChange} color="primary" />}
						label="manter-me conectado"
					/>
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
