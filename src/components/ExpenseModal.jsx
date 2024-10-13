import { useEffect, useState } from "react";
import {
	Title,
	Button,
	Space,
	Modal,
	Input,
	Select,
	Group,
	Divider,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
function ExpenseModal({ close, opened, onSubmit, members }) {
	const [title, setTitle] = useInputState("");
	const [amount, setAmount] = useInputState(0);
	const [date, setDate] = useState(new Date());
	const [paidBy, setPaidBy] = useInputState("");
	const [splits, setSplits] = useState([]);

	useEffect(() => {
		console.log(members)
		const tempSplits = members?.map((member) => {
			return {
				userId: member.userId,
				username: member.username,
				amount: 0,
			};
		});
		setSplits(tempSplits);
	}, [members, opened]);
	const parse = (splits) => {
		const parsedSplits = splits?.map((split) => {
			return {
				...split,
				amount: parseInt(split?.amount),
			};
		});
		return parsedSplits;
	};
	const validateExpense = (amount, splits) => {
		const parsedAmount = Number.parseInt(amount);
		const total = splits.reduce((sum, split) => {
			return sum + split?.amount;
		}, 0);
		if (parsedAmount !== total)
			notifications.show({
				title: "The sum of splits is not equal to the amount paid",
				color: "red",
			});
		return parsedAmount === total;
	};
	const saveExpense = () => {
		const split = parse(splits);
		if (validateExpense(amount, split)) {
			if (!paidBy || !title || !amount) {
				notifications.show({
					title: "Some fields is empty!",
					color: "red",
				});
				return;
			}
			const paidByObj = splits.find((split) => split.username === paidBy);
			const paidByProper = {
				userId: paidByObj.userId,
				username: paidBy,
			};
			console.log(split)
			onSubmit(title, Number.parseInt(amount), paidByProper, date, split);
			setTitle("");
			setAmount(0);
			setPaidBy("");
			setDate(new Date());
			setSplits([])
			close();
		}
	};
	const inputSplits = splits?.map((split, index) => {
		return (
			<Input.Wrapper
				size='md'
				key={split.userId}
				label={split.username}
				className='mb-3'>
				<Input
					userId={split.userId}
					type='number'
					value={split?.amount}
					onChange={(event) => {
						const newValues = splits?.map((currSplit, idx) => {
							if (split.userId === currSplit.userId) {
								return {
									...currSplit,
									amount: event.target.value,
								};
							}
							return currSplit;
						});
						setSplits(newValues);
					}}
				/>
			</Input.Wrapper>
		);
	});
	return (
		<Modal
			size={"lg"}
			opened={opened}
			onClose={close}
			centered
			radius={"md"}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
			withCloseButton={false}>
			<Group
				grow
				align='flex-start'
				justify='space-between'
				className='p-3'>
				<div>
					<Title order={2} mb={"sm"}>
						Details
					</Title>
					<Input.Wrapper label='Description' size='md'>
						<Input size='md' value={title} onChange={setTitle} />
					</Input.Wrapper>
					<Space h={"md"} />
					<Input.Wrapper label='Amount' size='md'>
						<Input size='md' value={amount} onChange={setAmount} />
					</Input.Wrapper>
					<Space h={"md"} />

					<Select
						label='Payed By'
						value={paidBy}
						onChange={setPaidBy}
						data={members?.map((member) => member.username)}
						size='md'
					/>
					<Space h={"md"} />

					<DateInput
						value={date}
						onChange={setDate}
						label='Date input'
						placeholder='Date input'
						popoverProps={{ withinPortal: true }}
					/>

					<Space h={"md"} />

					<Button onClick={saveExpense} size='md' fullWidth>
						Add
					</Button>
				</div>
				<div>
					<Title order={2} mb={"sm"}>
						Splits
					</Title>
					{inputSplits}
				</div>
			</Group>
		</Modal>
	);
}
export default ExpenseModal;
