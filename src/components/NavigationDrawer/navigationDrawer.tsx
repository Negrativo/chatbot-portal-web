import React, { useContext, useState } from "react";
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Avatar,
	Typography,
} from "@mui/material";
import {
	Dashboard,
	Chat,
	CalendarToday,
	AttachMoney,
	Support,
	Help,
	Menu,
	ExpandLess,
	ExpandMore,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: drawerWidth,
		boxSizing: "border-box",
	},
}));

const CollapsedDrawer = styled(Drawer)(({ theme }) => ({
	width: theme.spacing(7) + 1,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: theme.spacing(7) + 1,
		boxSizing: "border-box",
	},
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	justifyContent: "flex-end",
}));

const MenuItems = [
	{ text: "Dashboard", icon: <Dashboard />, route: "/dashboard" },
	{ text: "Conversas", icon: <Chat />, route: "/chats" },
	{ text: "Consultas", icon: <CalendarToday />, route: "/dashboard" },
	{ text: "Suporte", icon: <Support />, route: "/dashboard" },
];

const NavigationDrawer: React.FC = () => {
	const [open, setOpen] = useState(false);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	function goToPageItem(rota: string) {
		navigate(rota);
	}

	return (
		<>
			<IconButton onClick={handleDrawerToggle}>{open ? <ExpandLess /> : <Menu />}</IconButton>
			{open ? (
				<StyledDrawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerToggle}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{MenuItems.map((item, index) => (
							<ListItem button key={index} onClick={() => goToPageItem(item.route)}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
						<Avatar alt="User" src="/static/images/avatar/1.jpg" />
						<div style={{ marginLeft: "16px" }}>
							<Typography variant="subtitle1">{user?.name}</Typography>
						</div>
					</div>
				</StyledDrawer>
			) : (
				<CollapsedDrawer variant="permanent">
					<DrawerHeader>
						<IconButton onClick={handleDrawerToggle}>{open ? <ExpandLess /> : <Menu />}</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{MenuItems.map((item, index) => (
							<ListItem button key={index}>
								<ListItemIcon>{item.icon}</ListItemIcon>
							</ListItem>
						))}
					</List>
					<Divider />
					<ListItem button>
						<ListItemIcon>
							<Avatar alt="User" src="/static/images/avatar/1.jpg" />
						</ListItemIcon>
					</ListItem>
				</CollapsedDrawer>
			)}
		</>
	);
};

export default NavigationDrawer;
