import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api";
const AuthContext = createContext();

function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");
	useEffect(() => {
		async function init() {
			try {
				const result = await api.get("/auth/check");
				console.log("user already logged in");
				setUserId(result.data.user.id);
				setUsername(result.data.user.username);
				setIsLoggedIn(true);
			} catch (error) {
				console.log(error.response?.data?.message);
			}
		}
		init();
	}, []);
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				userId,
				setUserId,
				username,
				setUsername,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
export { AuthContext, AuthProvider };
