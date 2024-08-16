import React from "react";
import "./BlocoDashboard.css";

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
