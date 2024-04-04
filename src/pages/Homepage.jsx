import { Link, Navigate } from "react-router-dom";
import { Button, Group, Container, Box, Image } from "@mantine/core";
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
						<Box className=''>
							<Logo />
						</Box>
						<p className='md:text-3xl font-bold'>EasySplit</p>
					</Group>
					<div className='flex gap-3 md:gap-10'>
						<Link
							to={"/register"}
							className='text-[#3DCE6D] font-semibold text-sm md:font-bold md:text-lg'>
							Register
						</Link>
						<Link
							to={"/login"}
							className='text-[#3DCE6D] font-semibold text-sm md:font-bold md:text-lg'>
							Login
						</Link>
					</div>
				</Group>
				<div className='flex flex-col justify-center pt-5 items-center lg:pt-32 lg:flex-row'>
					<Box className='h-1/2 mb-8 md:mb-0'>
						<p
							className='text-3xl md:text-7xl font-extrabold text-neutral-950 mb-7 '
							style={{
								fontFamily:
									" Greycliff CF var(--mantine-font-family)",
							}}>
							Split Expenses in Seconds
						</p>
						<p className='mb-8 md:text-2xl text-slate-600'>
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
