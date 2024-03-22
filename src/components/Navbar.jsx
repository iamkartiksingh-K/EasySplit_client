import { Paper, Box } from "@mantine/core";
import {
	IconUser,
	IconUsersGroup,
	IconLogout,
	IconClipboardList,
	IconHeartHandshake,
} from "@tabler/icons-react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Logo } from "../assets/CustomIcons";
import api from "../../api";
import NavElement from "./NavElement";
function Navbar() {
	const { setIsLoggedIn } = useContext(AuthContext);
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
		<Paper shadow='md' className='h-full w-20 ' withBorder>
			<div className='py-3 flex flex-col items-center justify-between h-full'>
				<div className='h-1/2 w-full flex flex-col items-center'>
					<NavElement to={"/app/Dashboard"} disableTooltip={true}>
						<Logo className='cursor-pointer w-8' />
					</NavElement>
					<div className='mt-8 flex flex-col items-center justify-between'>
						<NavElement
							to={"/app/Expenses"}
							label={"Expenses"}
							className={"my-3"}
							hoverEffect>
							<IconClipboardList className='cursor-pointer' />
						</NavElement>
						<NavElement
							to={"/app/Groups"}
							label={"Groups"}
							className={"my-3"}
							hoverEffect>
							<IconUsersGroup className=' cursor-pointer' />
						</NavElement>
						<NavElement
							to={"/app/Friends"}
							label={"Friends"}
							className={"my-3"}
							hoverEffect>
							<IconHeartHandshake className=' cursor-pointer' />
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
