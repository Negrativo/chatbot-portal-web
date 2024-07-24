import React, { useState, useContext } from "react";
import "./sidebar.css";
import { Navigate, useNavigate } from "react-router-dom";
import UserProfileNavbar from "../UserProfileNavbar/userProfileNavbar";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
	const { user } = useContext(UserContext);
	const [active, setActive] = useState("dashboard");

	const navigate = useNavigate();

	const handleItemClick = (page) => {
		setActive(page);
		navigate(`/${page}`);
	};

	return (
		<div className="sidebar">
			<div className="logo">
				<img src="/icons/logo.svg" alt="Logo" />
			</div>
			<nav className="nav-group-itens">
				<ul className="nav-ul-itens">
					<li
						className={`nav-item ${active === "dashboard" ? "active" : ""}`}
						onClick={() => handleItemClick("dashboard")}
					>
						<img src="/icons/dashboard.svg" alt="Dashboard" />
						<span>Dashboard</span>
					</li>
					<li
						className={`nav-item ${active === "conversas" ? "active" : ""}`}
						onClick={() => handleItemClick("conversas")}
					>
						<img src="/icons/conversas.svg" alt="Conversas" />
						<span>Conversas</span>
					</li>
					<li
						className={`nav-item ${active === "consultas" ? "active" : ""}`}
						onClick={() => handleItemClick("consultas")}
					>
						<img src="/icons/consulta.svg" alt="Consultas" />
						<span>Consultas</span>
					</li>
					<li
						className={`nav-item ${active === "renda" ? "active" : ""}`}
						onClick={() => handleItemClick("renda")}
					>
						<img src="/icons/renda.svg" alt="Renda" />
						<span>Renda</span>
					</li>
					<li
						className={`nav-item ${active === "suporte" ? "active" : ""}`}
						onClick={() => handleItemClick("suporte")}
					>
						<img src="/icons/suporte.svg" alt="Suporte" />
						<span>Suporte</span>
					</li>
					<li
						className={`nav-item ${active === "ajuda" ? "active" : ""}`}
						onClick={() => handleItemClick("ajuda")}
					>
						<img src="/icons/ajuda.svg" alt="Ajuda" />
						<span>Ajuda</span>
					</li>
				</ul>
			</nav>
			<div className="group-user-profile">
				<UserProfileNavbar imageUrl={""} />
				<div className="user-info">
					<span>{user?.name}</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
