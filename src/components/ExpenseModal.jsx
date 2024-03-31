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
function ExpenseModal({ options, close, opened, onSubmit, members }) {
	const [title, setTitle] = useInputState("");
	const [amount, setAmount] = useInputState(0);
	const [date, setDate] = useState(new Date());
	const [paidBy, setPaidBy] = useInputState("");
	const [splits, setSplits] = useState([]);
	const userMap = Object.fromEntries(
		options.map((option, index) => {
			return [option, members[index]._id];
		})
	);
	useEffect(() => {
		const tempSplits = members.map((member, index) => {
			return {
				userId: member._id,
				username: member.username,
				amount: 0,
			};
		});
		setSplits(tempSplits);
	}, [members]);
	const parse = (splits) => {
		const parsedSplits = splits.map((split) => {
			return {
				...split,
				amount: parseInt(split?.amount),
			};
		});
		return parsedSplits;
	};
	const validateExpense = (amount, splits) => {
		const parsedAmount = parseInt(amount);
		const total = splits.reduce((sum, split) => {
			return sum + split?.amount;
		}, 0);
		return parsedAmount === total;
	};
	const inputSplits = splits.map((split, index) => {
		return (
			<Input.Wrapper
				size='md'
				key={split.userId}
				label={options[index]}
				className='mb-3'>
				<Input
					index={index}
					type='number'
					value={splits[index]?.amount}
					onChange={(event) => {
						const newValues = splits.map((split, idx) => {
							if (index === idx) {
								return {
									...split,
									amount: event.target.value,
								};
							}
							return split;
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
						data={options}
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

					<Button
						onClick={() => {
							const split = parse(splits);
							if (validateExpense(amount, split)) {
								const paidByProper = {
									userId: userMap[paidBy],
									username: paidBy,
								};
								onSubmit(
									title,
									parseInt(amount),
									paidByProper,
									date,
									split
								);
								setTitle("");
								setAmount(0);
								setPaidBy(null);
								setDate(new Date());
								close();
							}
						}}
						size='md'
						fullWidth>
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
