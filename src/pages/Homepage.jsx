import { Link, Navigate } from "react-router-dom";
import {
	Button,
	Group,
	Container,
	Title,
	Space,
	Text,
	Box,
	Image,
	Paper,
} from "@mantine/core";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Logo } from "../assets/CustomIcons";
function Homepage() {
	const { isLoggedIn } = useContext(AuthContext);
	if (isLoggedIn) return <Navigate to={"../app/Groups"} replace />;

	return (
		<>
			<Container size='xl' className='h-full'>
				<Group justify='space-between' className='px-5 py-3 w-full '>
					<Group>
						<Logo />
						<p className='text-3xl font-bold'>EasySplit</p>
					</Group>
					<Group>
						<Link to={"/register"}>
							<Button size='lg' variant='subtle' color='myColor'>
								Register
							</Button>
						</Link>
						<Link to={"/login"}>
							<Button size='lg' variant='subtle' color='myColor'>
								Login
							</Button>
						</Link>
					</Group>
				</Group>
				<div className=' flex justify-center items-center pt-32'>
					<Box className='h-1/2'>
						<p
							className='text-7xl font-extrabold text-neutral-950 mb-7 '
							style={{
								fontFamily:
									" Greycliff CF var(--mantine-font-family)",
							}}>
							Split Expenses in Seconds
						</p>
						<p className='mb-8 text-2xl text-slate-600'>
							Forget complicated spreadsheets or awkward "who owes
							what" conversations. EasySplit's intuitive interface
							handles all the calculations, ensuring accurate and
							transparent splits every single time.
						</p>
						<Link to={"/register"}>
							<Button
								size='lg'
								// variant='outline'
								color={"myColor"}>
								Get Started
							</Button>
						</Link>
					</Box>
					<Image src={"expense.jpg"} w='600' />
				</div>
			</Container>
		</>
	);
}

export default Homepage;
