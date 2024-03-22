import {
	Container,
	Paper,
	Input,
	Button,
	Box,
	Title,
	Text,
} from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../../api";

function Login() {
	const [details, setDetails] = useState({
		username: "",
		password: "",
	});
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const handleChange = (value, field) => {
		const newDetails = { ...details, [field]: value };
		setDetails(newDetails);
	};
	const submit = () => {
		api.post("/auth/login", JSON.stringify(details))
			.then((result) => {
				if (result.status == 200) {
					console.log("logged in");
					setDetails({
						username: "",
						password: "",
					});
					setIsLoggedIn(true);
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	if (isLoggedIn) return <Navigate to={"../app/Dashboard"} replace />;
	return (
		<Container className='h-full flex justify-center items-center'>
			<Paper withBorder radius={"md"} shadow='md' className='w-96 p-8'>
				<Box className='mb-8'>
					<Title order={2} className='mb-6'>
						Login
					</Title>
					<Text size={"lg"}>Hi! Welcome Back.👋</Text>
				</Box>
				<form>
					<Input.Wrapper
						label='Username'
						className='my-3'
						size='lg'
						withAsterisk>
						<Input
							size='md'
							value={details.username}
							onChange={(event) =>
								handleChange(event.target.value, "username")
							}
							required
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label='Password'
						className='my-3'
						size='lg'
						withAsterisk>
						<Input
							size='md'
							value={details.password}
							onChange={(event) =>
								handleChange(event.target.value, "password")
							}
							type='password'
							required
						/>
					</Input.Wrapper>
					<Button
						size='md'
						onClick={submit}
						className='mt-6'
						fullWidth>
						Login
					</Button>
					<Box mt={"xs"} ta={"center"}>
						<Link
							to='../register'
							className='text-blue-600 hover:underline'>
							Don't have an account?
						</Link>
					</Box>
				</form>
			</Paper>
		</Container>
	);
}
export default Login;
