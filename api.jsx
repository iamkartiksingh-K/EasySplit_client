import axios from "axios";

axios.defaults.baseURL = "https://easysplit-server.onrender.com/api";

const api = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	crossDomain: true,
});

export default api;
