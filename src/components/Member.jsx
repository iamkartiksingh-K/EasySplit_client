import { Card, Avatar, Text, Group } from "@mantine/core";
function Member({ name }) {
	return (
		<Card withBorder>
			<Group>
				<Avatar />
				<Text fw={500}>{name}</Text>
			</Group>
		</Card>
	);
}
export default Member;
