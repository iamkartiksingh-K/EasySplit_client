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
			<div className='grid grid-cols-12 py-2'>
				<div className='grid-span-1'>
					<Navbar className='fixed left-2 bottom-1 top-1' />
				</div>
				<div className='col-start-3 col-end-11'>
					<Outlet />
				</div>
			</div>
		</Container>
	);
}

export default App;
