import { Grid, Title, Space, Button, Group, Modal, Input } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import GroupCard from "../components/GroupCard";
import api from "../../api";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import userDataContext from "../contexts/userDataContext";
import { AuthContext } from "../contexts/AuthContext";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { IconPlus } from "@tabler/icons-react";

function Groups() {
	const { groups, setGroups } = useContext(userDataContext);
	const { isLoggedIn, userId } = useContext(AuthContext);
	const [opened, { open, close }] = useDisclosure(false);
	const [groupName, setGroupName] = useInputState("");
	const [groupMembers, setGroupMembers] = useState([]);
	const [memberName, setMemberName] = useInputState("");
	const [cover, setCover] = useInputState("");
	const [value, update] = useForceUpdate();

	if (!isLoggedIn) return <Navigate to={"../login"} />;
	useEffect(() => {
		api.get("groups")
			.then((result) => {
				console.log(result.data);
				setGroups(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [value]);

	const addGroup = async () => {
		console.log(groupMembers);
		await api
			.post("/groups", {
				name: groupName,
				members: groupMembers,
				cover:
					cover ||
					"https://images.unsplash.com/photo-1514810771018-276192729582?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			})
			.then((result) => {
				console.log(result);
				close();
				setGroupMembers([]);
				setGroupName("");
				update();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const addMember = async () => {
		api.get(`/users/search/${memberName}`)
			.then((memberDetails) => {
				console.log(memberDetails);
				console.log(memberName);
				if (
					memberDetails.data &&
					memberDetails.data._id !== userId &&
					!groupMembers.includes({
						userId: memberDetails.data._id,
						username: memberDetails.data.username,
					})
				) {
					setGroupMembers([
						...groupMembers,
						{
							userId: memberDetails.data._id,
							username: memberDetails.data.username,
						},
					]);
					console.log("member added");
					setMemberName("");
					update();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const renderedGroups = groups.map((group) => {
		const balance = group.balances.find(
			(balance) => balance.userId === userId
		);
		return (
			<Grid.Col span={{ xs: 12, md: 6, lg: 3, xl: 3 }} key={group._id}>
				<Link to={`${group._id}`}>
					<GroupCard
						coverImg={group.cover}
						groupId={group._id}
						title={group.name}
						memberCount={group.members.length}
						balance={balance}
					/>
				</Link>
			</Grid.Col>
		);
	});
	return (
		<>
			<Modal
				className='p-5'
				opened={opened}
				onClose={close}
				centered
				size={"sm"}
				withCloseButton={false}>
				<Title order={2} mb={"sm"}>
					Details
				</Title>
				<Input.Wrapper label='Group Name' size='md'>
					<Input
						size='md'
						value={groupName}
						onChange={setGroupName}
					/>
				</Input.Wrapper>
				<Input.Wrapper label='Group Members' size='md' className='mt-3'>
					<Input
						size='md'
						className='grow'
						rightSectionPointerEvents='all'
						value={memberName}
						onChange={setMemberName}
						rightSection={
							<IconPlus
								className='cursor-pointer'
								onClick={addMember}
							/>
						}
					/>
				</Input.Wrapper>
				<Input.Wrapper label='Group Cover' size='md' className='mt-3'>
					<Input
						size='md'
						className='grow'
						value={cover}
						onChange={setCover}
					/>
				</Input.Wrapper>
				<Button
					color='#17CF97'
					size='md'
					fullWidth
					onClick={addGroup}
					className='mt-5'>
					Submit
				</Button>
			</Modal>
			<Group justify='space-between' m={"md"}>
				<Title order={1}>My Groups</Title>
				<Button
					color={"myColor"}
					onClick={open}
					leftSection={<IconPlus size={20} />}>
					Add Group
				</Button>
			</Group>
			<Grid className='mt-8'>{renderedGroups}</Grid>
		</>
	);
}
export default Groups;
