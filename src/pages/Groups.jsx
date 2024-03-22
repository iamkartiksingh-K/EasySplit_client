import { Grid, Title, Space, Button, Group, Container } from "@mantine/core";
import GroupCard from "../components/GroupCard";
import api from "../../api";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import userDataContext from "../contexts/userDataContext";
import { AuthContext } from "../contexts/AuthContext";
function Groups() {
	const { groups, setGroups } = useContext(userDataContext);
	const { isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		api.get("groups")
			.then((result) => {
				console.log("here");
				setGroups(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [isLoggedIn]);

	const addGroup = async () => {
		api.post("/groups", { name: "new Group2999", members: [] })
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const renderedGroups = groups.map((group) => {
		return (
			<Grid.Col span={2} key={group._id}>
				<Link to={`${group._id}`}>
					<GroupCard
						groupId={group._id}
						title={group.name}
						memberCount={group.members.length}
					/>
				</Link>
			</Grid.Col>
		);
	});
	return (
		<div>
			<Group justify='space-between'>
				<Title order={1}>My Groups</Title>
				<Button onClick={addGroup} leftSection={<IconPlus size={20} />}>
					Add Group
				</Button>
			</Group>
			<Space h='xl' />
			<Grid className='mt-8'>{renderedGroups}</Grid>
		</div>
	);
}
export default Groups;
