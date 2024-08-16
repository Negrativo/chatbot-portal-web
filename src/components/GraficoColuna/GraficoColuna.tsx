import { Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ChartData {
	name: string;
	agendamentos: number;
	conversas: number;
	qtd: number;
}

interface ChartProps {
	data: ChartData[];
}

const BarChartComponent: React.FC<ChartProps> = ({ data }) => {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
				Histórico
			</Typography>
			<BarChart width={500} height={300} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="agendamentos" fill="#127900" />
				<Bar dataKey="conversas" fill="#0045af" />
			</BarChart>
		</div>
	);
};

export default BarChartComponent;
