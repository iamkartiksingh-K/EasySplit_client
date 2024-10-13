import ExpenseCard from "../components/ExpenseCard";
import api from "../../api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Group, Stack, Title, Button, Divider } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useRefresh } from "../hooks/useRefresh";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const { userId } = useContext(AuthContext);
  const [value, update] = useRefresh();

  useEffect(() => {
    api
      .get("expenses/")
      .then((result) => {
        console.log(result.data);
        setExpenses(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);
  const expenseList = expenses.map((currExpense) => {
    const yourSplit = currExpense.split.find((user) => userId === user.userId);
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
      <Group justify="space-between">
        <Title order={1} m={"md"}>
          All Expenses
        </Title>
        <Button variant="light">
          <IconRefresh onClick={update} />
        </Button>
      </Group>
      <Divider />
      <Stack className="mt-5">{expenseList}</Stack>
    </>
  );
}
export default Expenses;
