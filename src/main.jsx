import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Homepage from "./pages/Homepage.jsx";
import Expenses from "./pages/Expenses.jsx";
import Groups from "./pages/Groups.jsx";
import GroupDetails from "./pages/GroupDetails.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/app",
		element: <App />,
		children: [
			{
				path: "Expenses",
				element: <Expenses />,
			},
			{
				path: "Groups",
				element: <Groups />,
			},
			{
				path: "Groups/:groupId",
				element: <GroupDetails />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);
const myColor = [
	"#e8fdef",
	"#d7f7e2",
	"#afebc4",
	"#84e0a4",
	"#62d788",
	"#4ad177",
	"#3dce6d",
	"#2db65b",
	"#22a14f",
	"#0e8c41",
];

const theme = createTheme({
	colors: {
		myColor,
	},
	fontFamily: "Greycliff CF, sans-serif",
	fontFamilyMonospace: "Monaco, Courier, monospace",
	headings: { fontFamily: "Greycliff CF, sans-serif" },
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<MantineProvider theme={theme}>
			<Notifications />
			<ModalsProvider>
				<RouterProvider router={router} />
			</ModalsProvider>
		</MantineProvider>
	</AuthProvider>
);
