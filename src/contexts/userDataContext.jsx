import { useState, createContext, useEffect } from "react";
import api from "../../api";
const userDataContext = createContext();

function UserDataContextProvider({ children }) {
	const [groups, setGroups] = useState([]);
	const [expenses, setExpenses] = useState([]);
	function getGroupData() {
		api.get("groups")
			.then((result) => {
				console.log(result.data);
				setGroups(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const eventSource = new EventSource("http://localhost:5000/api/updates", {
		withCredentials: true,
	});
	eventSource.onmessage = (event) => {
		const data = JSON.parse(event.data);
		// console.log(data.newGroup);
		if (data.newGroup) {
			if (Object.keys(data) === 0) {
				getGroupData();
			} else setGroups([...groups, data.newGroup]);
		} else {
			// if (Object.keys(data) === 0)
			// setExpenses([...expenses, data.newExpense]);
		}
	};
	eventSource.onerror = (err) => {
		console.log(err);
	};
	return (
		<userDataContext.Provider
			value={{ groups, setGroups, expenses, setExpenses }}>
			{children}
		</userDataContext.Provider>
	);
}
export default userDataContext;
export { UserDataContextProvider };
