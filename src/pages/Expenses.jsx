import ExpenseCard from "../components/ExpenseCard";
import api from "../../api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Stack, Title, ScrollArea } from "@mantine/core";
function Expenses() {
	const [expenses, setExpenses] = useState([]);
	const { userId } = useContext(AuthContext);
	useEffect(() => {
		api.get("expenses/")
			.then((result) => {
				console.log(result.data);
				setExpenses(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const expenseList = expenses.map((currExpense) => {
		const yourSplit = currExpense.split.find(
			(user) => userId === user.userId
		);
		const date = new Date(currExpense.date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return (
			<ExpenseCard
				key={currExpense._id}
				title={currExpense.description}
				amount={currExpense.amount}
				payer={currExpense.paidBy.username}
				date={date}
				group={currExpense.group.groupName}
				yourSplit={yourSplit}
				allSplits={currExpense.split}
				paidByUser={currExpense.paidBy.userId === userId}
				showBadge
			/>
		);
	});
	return (
		<>
			<Title order={1} m={"md"}>
				All Expenses
			</Title>
			<Stack>{expenseList}</Stack>
		</>
	);
}
export default Expenses;
