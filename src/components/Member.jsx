import { Card, Avatar, Text, Group } from "@mantine/core";
import { IconUserX } from "@tabler/icons-react";
function Member({ name, removeMember, userId, isAdmin }) {
	return (
		<Card withBorder>
			<Group justify='space-between'>
				<Group>
					<Avatar />
					<Text fw={500}>{name}</Text>
				</Group>
				{isAdmin && (
					<IconUserX
						color='red'
						onClick={() => removeMember(userId)}
					/>
				)}
			</Group>
		</Card>
	);
}
export default Member;
