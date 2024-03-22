import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api";
const AuthContext = createContext();

function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		api.get("/auth/check")
			.then((result) => {
				if (result.status === 200) {
					console.log("user already logged in");
					setIsLoggedIn(true);
				} else {
					console.log(result);
					console.log("here");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}
export { AuthContext, AuthProvider };
