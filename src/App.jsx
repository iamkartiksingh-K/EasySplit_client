import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import Navbar from "./components/Navbar";

function App() {
	const { isLoggedIn } = useContext(AuthContext);
	if (!isLoggedIn) return <Navigate to={"../login"} replace />;

	return (
		<Container fluid>
			<div className='grid grid-cols-12 h-dvh py-2'>
				<div className='grid-span-1'>
					<Navbar />
				</div>
				<Container size={"xl"} className='col-start-2 col-end-13'>
					<Outlet />
				</Container>
			</div>
		</Container>
	);
}

export default App;
