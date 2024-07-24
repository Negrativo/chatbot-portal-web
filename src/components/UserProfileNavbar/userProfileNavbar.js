import React, { useContext } from "react";
import "./userProfileNavbar.css";
import { UserContext } from "../../context/UserContext";

const UserProfileNavbar = ({ imageUrl }) => {
	const { user } = useContext(UserContext);

	const getInitial = (name) => {
		return name ? name.charAt(0).toUpperCase() : "";
	};

	return (
		<div className="user-profile">
			{imageUrl ? (
				<img src={imageUrl} alt="User Profile" className="user-image" />
			) : (
				<div className="user-initial">{getInitial(user?.name)}</div>
			)}
		</div>
	);
};

export default UserProfileNavbar;
