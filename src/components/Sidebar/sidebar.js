import React, { useState, useContext } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import UserProfileNavbar from "../UserProfileNavbar/userProfileNavbar";
import { UserContext } from "../../context/UserContext";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Sidebar = () => {
	const { user, logoutUser } = useContext(UserContext); // Assuming `logout` is a function in your context
	const [active, setActive] = useState("Geral");
	const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
	const [isExpanded, setIsExpanded] = useState(true);

	const navigate = useNavigate();

	const handleItemClick = (page) => {
		setActive(page);
		page = page === "Médicos" ? "Medicos" : page;
		navigate(`/${page}`);
	};

	const handleLogoutClick = () => {
		logoutUser(); // Function to log out the user
		navigate("/login"); // Redirect to login page after logout
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen); // Toggle modal visibility
	};

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded); // Toggle sidebar expansion
	};

	return (
		<div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
			<div className="arrow-expand" onClick={toggleSidebar}>
				{isExpanded ? (
					<KeyboardDoubleArrowLeftIcon sx={{ color: "#53535355" }} />
				) : (
					<KeyboardDoubleArrowRightIcon sx={{ color: "#53535355" }} />
				)}
			</div>
			<div className="logo">
				{" "}
				{/* Toggle when logo is clicked */}
				<img src="/icons/medico-login.svg" alt="Logo" />
			</div>
			<nav className="nav-group-itens">
				<ul className="nav-ul-itens">
					{["Geral", "Conversas", "Calendario", "Pacientes", "Médicos", "Suporte"].map((item) => (
						<li
							key={item}
							className={`nav-item ${active === item ? "active cor-primaria" : ""}`}
							onClick={() => handleItemClick(item)}
						>
							<img src={`/icons/${item}.svg`} alt={item} />
							{isExpanded && <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>}
						</li>
					))}
				</ul>
			</nav>
			<div className="group-user-profile">
				<UserProfileNavbar imageUrl={""} />
				{isExpanded && (
					<div className="user-info" onClick={toggleModal}>
						<span>{user?.name}</span>
					</div>
				)}

				{isModalOpen && isExpanded && (
					<div className="modal-option-sidebar">
						<button onClick={handleLogoutClick} className="logout-btn">
							Logout
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
