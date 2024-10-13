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
	IconRefresh,
} from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { useEffect, useState, useContext } from "react";
import ExpenseCard from "../components/ExpenseCard";
import Member from "../components/Member";
import ExpenseModal from "../components/ExpenseModal";
import { AuthContext } from "../contexts/AuthContext";
import StatusCard from "../components/StatusCard";
import Edit from "../components/Edit";
import SettleExpenses from "../components/SettleExpenses";
import { notifications } from "@mantine/notifications";
import { useRefresh } from "../hooks/useRefresh";
function GroupDetails() {
	const { userId } = useContext(AuthContext);
	const [value, update] = useRefresh();
	const { groupId } = useParams();
	const [groupData, setGroupData] = useState({});
	const [opened, { open, close }] = useDisclosure(false);
	const [isOpen, { open: openModal, close: closeModal }] =
		useDisclosure(false);
	const [expenses, setExpenses] = useState([]);
	const [newMemberName, setNewMemberName] = useInputState("");
	const [newImage, setNewImage] = useInputState("");
	const [newName, setNewName] = useInputState("");
	const [transactions, setTransactions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("here");
		async function init() {
			try {
				const response = await api.get(`groups/${groupId}`);
				const groupInfo = response.data.data;
				setGroupData(groupInfo);
				const allExpenses = await api.get(
					`expenses/${groupId}/getAllExpenses`
				);
				setExpenses(allExpenses.data.data);
			} catch (error) {
				console.log(error);
				notifications.show({
					title: error.response.data.message,
					color: "red",
				});
			}
		}
		init();
	}, [value]);

	const submit = async (title, amount, paidBy, date, split) => {
		const expense = {
			description: title,
			amount,
			date,
			paidBy,
			group: { groupId, groupName: groupData.name },
			split,
		};
		// console.log(expense);
		try {
			const result = await api.post("/expenses", {
				data: expense,
			});
			console.log(expenses)
			setExpenses([...expenses, result.data.data]);
			const response = await api.get(`groups/${groupId}`);
			const groupInfo = response.data.data;
			setGroupData(groupInfo);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteExpense = async (id) => {
		
		try {
			const result = await api.delete(`/expenses/${groupId}/${id}`);

			setExpenses(expenses.filter(expense => expense._id !== id))
			const response = await api.get(`groups/${groupId}`);
			const groupInfo = response.data.data;
			setGroupData(groupInfo);
		} catch (error) {
			console.log(error);
		}
	};
	const addMember = async () => {
		try {
			const result = await api.post(`groups/${groupId}/members`, {
				username: newMemberName,
			});
			console.log(result);
			setGroupData(result.data.data);
			notifications.show({
				title: result.data.message,
			});
			setNewMemberName("");
		} catch (error) {
			console.log(error);
			notifications.show({
				title: error.response.data.message,
				color: "red",
			});
		}
	};
	const removeMember = async (userToRemove) => {
		try {
			const result = await api.post(`groups/${groupId}/removeMember`, {
				userToRemove,
			});
			console.log(result);
			setGroupData(result.data.data);
			notifications.show({
				title: result.data.message,
			});
		} catch (error) {
			console.log(error);
			notifications.show({
				title: error.response.data.message,
				color: "red",
			});
		}
	};
	const leaveGroup = async () => {
		try {
			const result = await api.post(`groups/${groupId}/leave`);
			setGroupData(result.data.data);
			navigate(-1);
			notifications.show({
				title: result.data.message,
			});
		} catch (error) {
			console.log(error);
			notifications.show({
				title: error.response.data.message,
				color: "red",
			});
		}
	};
	const updateGroup = async () => {
		const body = { cover: newImage, groupName: newName };
		try {
			const result = await api.put(`groups/${groupId}`, body);
			// console.log(result.data.data);
			setGroupData(result.data.data);
			console.log(result.data.data);
			setNewName("");
			setNewImage("");
			notifications.show({
				title: result.data.message,
			});
		} catch (error) {
			console.log(error);
		}
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
						setGroupData({});
						navigate(-1);
					})
					.catch((error) => {
						console.log(error);
						notifications.show({
							title: error.response.data.message,
							color: "red",
						});
					});
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
				setGroupData(result.data.data);
				notifications.show({
					title: result.data.message,
				});
			})
			.catch((error) =>
				notifications.show({
					title: error.response?.data.message,
					color: "red",
				})
			);
	};

	const membersList = groupData.members?.map((member) => {
		return (
			<Member
				key={member.userId}
				userId={member.userId}
				me={userId}
				admin={groupData.admin}
				name={member.username}
				leaveGroup={leaveGroup}
				removeMember={removeMember}
			/>
		);
	});
	const expenseList = expenses.map((expense) => {
		const date = new Date(expense.date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const yourSplit = expense.split.find((user) => userId === user.userId);
		return (
			<ExpenseCard
				key={expense._id}
				id={expense._id}
				title={expense.description}
				amount={expense.amount}
				payer={expense.paidBy.username}
				date={date}
				group={groupData.name}
				yourSplit={yourSplit}
				allSplits={expense.split}
				paidByUser={expense.paidBy.userId === userId}
				deleteExpense = {deleteExpense}
			/>
		);
	});

	const transactionList = transactions.map((transaction) => {
		return (
			<Table.Tr
				key={`${transaction.from}${transaction.to}${transaction.amount}`}>
				<Table.Td>{transaction.from}</Table.Td>
				<Table.Td>{transaction.to}</Table.Td>
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

	const balanceInfo = groupData?.balances?.find(
		(balance) => balance.userId === userId
	);

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
					<Button variant='light'>
						<IconRefresh onClick={update} />
					</Button>
					<Button onClick={getTransactions}>Settle Expenses</Button>
					<Button
						color={"red"}
						onClick={deleteGroup}
						leftSection={<IconTrash className='w-4' />}>
						Delete Group
					</Button>
				</Group>
			</Group>
			<div className='flex flex-col my-10 gap-2 md:flex-row' gap={"lg"}>
				<StatusCard
					className='grow'
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
					className='grow'
					title={"You Owe"}
					value={balanceInfo?.youOwe}
					color='red'
					icon={<IconArrowDownRight />}
					iconColor={"red"}
				/>
				<StatusCard
					className='grow'
					title={"You Are Owed"}
					value={balanceInfo?.youAreOwed}
					color='green'
					icon={<IconArrowUpRight />}
					iconColor='green'
				/>
			</div>
			<ExpenseModal
				close={close}
				opened={opened}
				onSubmit={submit}
				members={groupData.members}
			/>
			<div className='flex flex-col  gap-16 md:flex-row '>
				<div className='grow order-2 md:order-1'>
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
				<div className='order-1 md:w-1/4 md:order-2'>
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
					<div className='flex flex-col gap-3'>{membersList}</div>
				</div>
			</div>
		</div>
	);
}
export default GroupDetails;
