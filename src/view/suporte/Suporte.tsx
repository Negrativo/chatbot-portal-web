import React, { useContext, useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import "./Suporte.css";

type Props = {};

const SuportePage: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);

	return (
		<div className="container padding-20">
			<div style={{ width: "100%", height: "100%" }}>
				<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
					Suporte
				</Typography>
			</div>
		</div>
	);
};

export default SuportePage;
