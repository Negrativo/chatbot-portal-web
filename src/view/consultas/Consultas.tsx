import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { UserContext } from "../../context/UserContext";
import "./Consultas.css";
type Props = {};

const Consultas: React.FC<Props> = (props) => {
	const { triggerNotification } = useNotification();
	const { user } = useContext(UserContext);

	return <div className="container"></div>;
};

export default Consultas;
