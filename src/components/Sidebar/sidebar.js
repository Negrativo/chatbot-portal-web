import React, { useState, useContext } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import UserProfileNavbar from "../UserProfileNavbar/userProfileNavbar";
import { UserContext } from "../../context/UserContext";

const Sidebar = () => {
	const { user } = useContext(UserContext);
	const [active, setActive] = useState("Geral");

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
					{["Geral", "Conversas", "Calendario", "Pacientes", "Suporte"].map((item) => (
						<li
							key={item}
							className={`nav-item ${active === item ? "active cor-primaria" : ""}`}
							onClick={() => handleItemClick(item)}
						>
							<img src={`/icons/${item}.svg`} alt={item} />
							<span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
						</li>
					))}
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
