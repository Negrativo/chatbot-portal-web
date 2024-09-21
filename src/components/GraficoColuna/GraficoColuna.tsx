import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { EstatisticaDash } from "../../interfaces/EstatisticaDash";
import { buscarDadosGrafico } from "../../services/dashboardService";

interface ChartData {
	name: string;
	agendamentos: number;
	conversas: number;
}

const BarChartComponent: React.FC = () => {
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		const loadGrafico = async () => {
			try {
				const data: EstatisticaDash = await buscarDadosGrafico();
				// Transform the response into the structure needed by the chart
				const formattedData = [
					{
						name: "Mês atual",
						agendamentos: data.agendamentos.mesAtual,
						conversas: data.conversas.mesAtual,
					},
					{
						name: "Mês anterior",
						agendamentos: data.agendamentos.mesAnterior,
						conversas: data.conversas.mesAnterior,
					},
				];
				setChartData(formattedData);
			} catch (error) {
				console.error("Erro ao buscar dados do gráfico:", error);
			}
		};

		loadGrafico();
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
			<Typography align="center" style={{ fontWeight: "bold" }} fontSize={24}>
				Histórico
			</Typography>
			<BarChart width={500} height={300} data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="agendamentos" fill="#1C5229" />
				<Bar dataKey="conversas" fill="#0045af" />
			</BarChart>
		</div>
	);
};

export default BarChartComponent;
