import React, { useContext } from "react";
import "./BlocoDashboard.css";
import { UserContext } from "../../context/UserContext";

interface WithNavigationDrawerProps {
	component: React.ComponentType<any>;
	componentProps?: any;
}

const BlocoDashboard: React.FC<WithNavigationDrawerProps> = ({ component: Component, componentProps }) => {
	return (
		<div className="bloco">
			<Component {...componentProps} />
		</div>
	);
};

export default BlocoDashboard;
