import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import Navbar from "./components/Navbar";

function App() {
	const { isLoggedIn } = useContext(AuthContext);
	if (!isLoggedIn) return <Navigate to={"/login"} replace />;

	return (
		<Container fluid>
			<div className='grid grid-cols-12 py-2 pb-20 md:p-0'>
				<Navbar className='fixed bottom-0 left-0 md:left-2 md:bottom-1 md:top-1' />
				<div className='col-start-1 col-end-13 pt-3 md:col-start-3 md:col-end-12'>
					<Outlet />
				</div>
			</div>
		</Container>
	);
}

export default App;
