import { Paper, Avatar } from "@mantine/core";
import {
	IconUsersGroup,
	IconLogout,
	IconClipboardList,
} from "@tabler/icons-react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import api from "../../api";
import NavElement from "./NavElement";
function Navbar({ className }) {
	const { setIsLoggedIn, username } = useContext(AuthContext);
	const logout = () => {
		api.post("/auth/logout")
			.then((result) => {
				setIsLoggedIn(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Paper
			shadow='md'
			className={`w-full h-16 z-10  md:h-full md:w-20 ${className} `}
			withBorder>
			<div className='flex gap-3 h-full justify-between w-full items-center  md:py-3  md:flex-col md:items-center md:justify-between md:h-full'>
				<div className='flex w-full  items-center md:h-1/2 md:w-full md:flex-col md:items-center'>
					<NavElement
						to={"/app/Groups"}
						label={username}
						isLogo={true}>
						<Avatar radius='xl' color='green' />
					</NavElement>
					<div className='flex flex-row gap-3 ml-3 justify-between items-center md:mt-8 md:flex-col md:items-center md:justify-center md:ml-0'>
						<NavElement
							to={"/app/Expenses"}
							label={"Expenses"}
							className={"my-3"}
							isLogo={false}
							hoverEffect>
							<IconClipboardList className='cursor-pointer' />
						</NavElement>
						<NavElement
							to={"/app/Groups"}
							label={"Groups"}
							className={"my-3"}
							isLogo={false}
							hoverEffect>
							<IconUsersGroup className=' cursor-pointer' />
						</NavElement>
					</div>
				</div>
				<NavElement
					label={"Logout"}
					onClick={logout}
					className={
						"transition duration-150 ease-in-out hover:text-red-500"
					}>
					<IconLogout className='justify-self-end cursor-pointer ' />
				</NavElement>
			</div>
		</Paper>
	);
}
export default Navbar;
