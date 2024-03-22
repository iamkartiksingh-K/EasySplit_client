import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserDataContextProvider } from "./contexts/userDataContext.jsx";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import Groups from "./pages/Groups.jsx";
import Friends from "./pages/Friends.jsx";
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
				path: "Dashboard",
				element: <Dashboard />,
			},
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
			{
				path: "Friends",
				element: <Friends />,
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
ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<UserDataContextProvider>
			<MantineProvider>
				<RouterProvider router={router} />
			</MantineProvider>
		</UserDataContextProvider>
	</AuthProvider>
);
