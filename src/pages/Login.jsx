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
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoggedIn, setIsLoggedIn, setUserId, setUsername } =
    useContext(AuthContext);
  const handleChange = (value, field) => {
    setErrorMsg("");
    const newDetails = { ...details, [field]: value };
    setDetails(newDetails);
  };
  const submit = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", JSON.stringify(details));
      console.log(response);
      setUserId(response.data.id);
      setUsername(response.data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  const guestLogin = async () => {
    try {
      setGuestLoading(true);
      const response = await api.post(
        "/auth/login",
        JSON.stringify({ username: "Guest", password: "1234" }),
      );
      console.log(response);
      setUserId(response.data.id);
      setUsername(response.data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message);
    } finally {
      setGuestLoading(false);
    }
  };
  if (isLoggedIn) return <Navigate to={"../app/Groups"} replace />;
  return (
    <Container className="h-full flex justify-center items-center">
      <Paper withBorder radius={"md"} shadow="md" className="w-96 p-8">
        <Box className="mb-8">
          <Title order={2} className="mb-6">
            Login
          </Title>
          <Text size={"lg"}>Hi! Welcome Back.👋</Text>
        </Box>
        <form>
          <Input.Wrapper
            label="Username"
            className="my-3"
            size="lg"
            withAsterisk
          >
            <Input
              size="md"
              value={details.username}
              onChange={(event) => handleChange(event.target.value, "username")}
              required
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Password"
            className="my-3"
            size="lg"
            withAsterisk
          >
            <Input
              size="md"
              value={details.password}
              onChange={(event) => handleChange(event.target.value, "password")}
              type="password"
              required
            />
          </Input.Wrapper>
          <Text c={"red"}>{errorMsg}</Text>
          <Button
            size="md"
            onClick={submit}
            className="mt-6"
            color="myColor"
            disabled={loading}
            loading={loading}
            fullWidth
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={guestLogin}
            className="mt-3"
            disabled={guestLoading}
            loading={guestLoading}
            fullWidth
          >
            {"Guest Login"}
          </Button>
          <Box mt={"xs"} ta={"center"}>
            <Link to="../register" className="text-blue-600 hover:underline">
              {"Don't have an account?"}
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
