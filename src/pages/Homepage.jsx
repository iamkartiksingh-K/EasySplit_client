import { Link, Navigate } from "react-router-dom";
import { Button, Group } from "@mantine/core";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function Homepage() {
	const { isLoggedIn } = useContext(AuthContext);
	if (isLoggedIn) return <Navigate to={"../app/Dashboard"} replace />;

	return (
		<div>
			<p>This is home page</p>
			<Group>
				<Link to={"/login"}>
					<Button>Login</Button>
				</Link>
				<Link to={"/register"}>
					<Button>Register</Button>
				</Link>
			</Group>
		</div>
	);
}

export default Homepage;
