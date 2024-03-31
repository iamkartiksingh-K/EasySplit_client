import "@mantine/dates/styles.css";
import {
	Title,
	Group,
	Flex,
	Button,
	Stack,
	Divider,
	Space,
	Popover,
	TextInput,
	Tooltip,
	BackgroundImage,
	ScrollArea,
	Table,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDisclosure, useInputState } from "@mantine/hooks";
import {
	IconPlus,
	IconUserPlus,
	IconTrash,
	IconPencil,
	IconScale,
	IconArrowDownRight,
	IconArrowUpRight,
} from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { useEffect, useState, useContext } from "react";
import ExpenseCard from "../components/ExpenseCard";
import Member from "../components/Member";
import ExpenseModal from "../components/ExpenseModal";
import { AuthContext } from "../contexts/AuthContext";
import { useForceUpdate } from "../hooks/useForceUpdate";
import StatusCard from "../components/StatusCard";
import Edit from "../components/Edit";
import SettleExpenses from "../components/SettleExpenses";

function GroupDetails() {
	const { userId } = useContext(AuthContext);
	const { groupId } = useParams();
	const [groupData, setGroupData] = useState({});
	const [members, setMemebers] = useState([]);
	const [options, setOptions] = useState([]);
	const [opened, { open, close }] = useDisclosure(false);
	const [isOpen, { open: openModal, close: closeModal }] =
		useDisclosure(false);
	const [expenses, setExpenses] = useState([]);
	const [value, update] = useForceUpdate();
	const [newMemberName, setNewMemberName] = useInputState("");
	const [newImage, setNewImage] = useInputState("");
	const [newName, setNewName] = useInputState("");
	const [transactions, setTransactions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		api.get(`groups/${groupId}`)
			.then((groupInfo) => {
				setGroupData(groupInfo.data);
				// console.log(groupData);
				const result = api.post(`groups/${groupId}/memberInfo`, {
					memberInfo: groupInfo.data.members,
				});
				return result;
			})
			.then((result) => {
				setMemebers(result.data);
				// console.log(result.data);
				const selectOptions = result.data.map((member) => {
					return member.fullName;
				});
				// console.log(selectOptions);
				setOptions(selectOptions);
				api.get(`expenses/${groupId}/getAllExpenses`).then(
					(allExpenses) => {
						// console.log(allExpenses);
						setExpenses(allExpenses.data);
					}
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [value]);

	const userMap = Object.fromEntries(
		members.map((member, index) => {
			return [member._id, options[index]];
		})
	);
	const membersList = groupData.members?.map((member) => {
		return <Member key={member.userId} name={member.username} />;
	});
	const expenseList = expenses.map((expense) => {
		const date = new Date(expense.date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		// console.log(userId);
		const yourSplit = expense.split.find((user) => userId === user.userId);
		return (
			<ExpenseCard
				key={expense._id}
				title={expense.description}
				amount={expense.amount}
				payer={expense.paidBy.username}
				date={date}
				group={groupData.name}
				yourSplit={yourSplit}
				allSplits={expense.split}
				paidByUser={expense.paidBy.userId === userId}
			/>
		);
	});
	const submit = (title, amount, paidBy, date, split) => {
		const expense = {
			description: title,
			amount,
			date,
			paidBy,
			group: { groupId, groupName: groupData.name },
			split,
		};
		// console.log(expense);
		api.post("/expenses", {
			data: expense,
		})
			.then((result) => {
				update();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const addMember = () => {
		api.post(`groups/${groupId}/members`, {
			username: newMemberName,
		}).then((result) => {
			// console.log(result);
			setNewMemberName("");
			update();
		});
	};
	const updateGroup = () => {
		const body = {};
		if (newImage) {
			body.cover = newImage;
			setNewImage("");
		}
		if (newName) {
			body.groupName = newName;
			setNewName("");
		}
		api.put(`groups/${groupId}`, body)
			.then((result) => {
				console.log(result);
				update();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const deleteGroup = () =>
		modals.openConfirmModal({
			title: "Are you sure?",
			labels: { confirm: "Yes", cancel: "Cancel" },
			onCancel: () => console.log("Cancel"),
			onConfirm: () => {
				console.log("Group delete");
				api.delete(`groups/${groupId}`)
					.then((result) => {
						console.log(result);
						update();
					})
					.catch((err) => console.log(err));

				navigate(-1);
			},
		});
	const getTransactions = () => {
		api.get(`/groups/${groupId}/getMinTransactions`)
			.then((result) => {
				console.log(result.data.data);
				setTransactions(result.data.data);
				openModal();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const settleExpense = (from, to, amount) => {
		console.log(from, to, amount);
		api.post(`/groups/${groupId}/settle`, { from, to, amount })
			.then((result) => {
				console.log(result);
				update();
			})
			.catch((err) => console.log(err));
	};
	const transactionList = transactions.map((transaction) => {
		return (
			<Table.Tr
				key={`${transaction.from}${transaction.to}${transaction.amount}`}>
				<Table.Td>{userMap[transaction.from]}</Table.Td>
				<Table.Td>{userMap[transaction.to]}</Table.Td>
				<Table.Td>{transaction.amount}</Table.Td>
				<Table.Td>
					<Button
						radius={"md"}
						variant='light'
						onClick={() => {
							settleExpense(
								transaction.from,
								transaction.to,
								transaction.amount
							);
							closeModal();
						}}>
						Settle
					</Button>
				</Table.Td>
			</Table.Tr>
		);
	});

	const balanceInfo =
		groupData.balances &&
		groupData.balances.find((balance) => balance.userId === userId);

	return (
		<div className='h-full overflow-clip pb-3'>
			<SettleExpenses isOpen={isOpen} closeModal={closeModal}>
				{transactionList}
			</SettleExpenses>
			<BackgroundImage
				className='relative'
				h={250}
				radius={"md"}
				src={groupData?.cover}>
				<Edit
					label={"Image URL"}
					value={newImage}
					setValue={setNewImage}
					onClick={updateGroup}>
					<Flex
						justify={"center"}
						align={"center"}
						className='cursor-pointer absolute bottom-4 right-4 rounded-full bg-gray-700 size-6 '>
						<IconPencil className=' text-slate-200 size-5' />
					</Flex>
				</Edit>
			</BackgroundImage>
			<Group justify='space-between' className='my-8'>
				<Group justify='center'>
					<Title>{groupData.name}</Title>
					<Edit
						label={"Group Name"}
						value={newName}
						setValue={setNewName}
						onClick={updateGroup}>
						<IconPencil className='cursor-pointer text-gray-600 size-5' />
					</Edit>
				</Group>
				<Group>
					<Button onClick={getTransactions}>Settle Expenses</Button>
					<Button
						color={"red"}
						onClick={deleteGroup}
						leftSection={<IconTrash className='w-4' />}>
						Delete Group
					</Button>
				</Group>
			</Group>
			<Group grow justify='center' className='my-10' gap={"lg"}>
				<StatusCard
					title={"Total Balance"}
					value={
						balanceInfo &&
						balanceInfo.youAreOwed - balanceInfo.youOwe
					}
					color={"dimmed"}
					iconColor='gray'
					icon={<IconScale />}
				/>
				<StatusCard
					title={"You Owe"}
					value={balanceInfo && balanceInfo.youOwe}
					color='red'
					icon={<IconArrowDownRight />}
					iconColor={"red"}
				/>
				<StatusCard
					title={"You Are Owed"}
					value={balanceInfo && balanceInfo.youAreOwed}
					color='green'
					icon={<IconArrowUpRight />}
					iconColor='green'
				/>
			</Group>
			<ExpenseModal
				close={close}
				opened={opened}
				onSubmit={submit}
				options={options}
				members={members}
			/>
			<div className='flex gap-16 '>
				<div className='grow'>
					<div>
						<Group justify='space-between' align='end'>
							<Title order={4}>Expense List</Title>

							<Button
								leftSection={<IconPlus className='w-5' />}
								onClick={open}
								c={"green"}
								variant='light'>
								Add Expense
							</Button>
						</Group>

						<Space h='sm' />
						<Divider />
						<Space h='sm' />
					</div>
					<Stack gap={"sm"}>{expenseList}</Stack>
				</div>
				<div className='w-1/4'>
					<div>
						<Group justify='space-between'>
							<Title order={4}>Members</Title>
							<Popover
								width={300}
								trapFocus
								position='bottom'
								withArrow
								shadow='md'
								onClose={() => {
									setNewMemberName("");
								}}>
								<Popover.Target>
									<Tooltip
										label='add a member'
										openDelay={300}
										transitionProps={{
											transition: "pop",
											duration: 300,
										}}>
										<IconUserPlus
											// onClick={() => setIsOpen(true)}
											className='text-green-600 w-5 cursor-pointer'
										/>
									</Tooltip>
								</Popover.Target>
								<Popover.Dropdown>
									<TextInput
										label='Username'
										placeholder='username'
										size='xs'
										value={newMemberName}
										onChange={setNewMemberName}
									/>
									<Button
										fullWidth
										className='mt-3'
										onClick={addMember}>
										Add
									</Button>
								</Popover.Dropdown>
							</Popover>
						</Group>
						<Space h='sm' />
						<Divider />
						<Space h='sm' />
					</div>
					<Stack justify='flex-start' gap={"sm"}>
						{membersList}
					</Stack>
				</div>
			</div>
		</div>
	);
}
export default GroupDetails;
