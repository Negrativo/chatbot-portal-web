import "./App.css";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import NotFoundScreen from "./view/notFound/notFoundScreen";
import Login from "./view/login/login";
import Dashboard from "./view/dashboard/Dashboard";
import RecuperarSenha from "./view/recuperarSenha/recuperarSenha";
import Sidebar from "./components/Sidebar/sidebar";
import Conversas from "./view/conversas/Conversas";
import Consultas from "./view/consultas/Consultas";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/recuperarSenha" element={<RecuperarSenha />} />
				<Route path="/dashboard" element={<WithNavigationDrawer component={Dashboard} />} />
				<Route path="/conversas" element={<WithNavigationDrawer component={Conversas} />} />
				<Route path="/consultas" element={<WithNavigationDrawer component={Consultas} />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</Router>
	);
}

interface WithNavigationDrawerProps {
	component: React.ComponentType;
}

const WithNavigationDrawer: React.FC<WithNavigationDrawerProps> = ({ component: Component }) => {
	return (
		<div className="side-bar-conteiner">
			<Sidebar />
			<div className="navigation-page">
				{" "}
				{/* Ajuste o marginLeft conforme a largura do drawer */}
				<Component />
			</div>
		</div>
	);
};

export default App;
