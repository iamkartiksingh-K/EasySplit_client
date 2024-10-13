import { Card, Avatar, Text, Group } from "@mantine/core";
import { IconUserX, IconCrown } from "@tabler/icons-react";
function Member({ name, removeMember, userId, admin, me, leaveGroup }) {
	let removeIcon = "";
	let leaveIcon = "";
	if (me === userId)
		leaveIcon = (
			<p
				className='text-red-500 font-semibold cursor-pointer'
				onClick={leaveGroup}>
				Leave
			</p>
		);
	if (me === admin) {
		removeIcon = (
			<IconUserX
				color='red'
				onClick={() => removeMember(userId)}
				className='cursor-pointer'
			/>
		);
	}

	return (
		<Card withBorder>
			<Group justify='space-between'>
				<Group>
					<Avatar />
					<Text fw={500}>{name}</Text>
					{userId === admin && (
						<IconCrown className='text-yellow-500' />
					)}
				</Group>
				{/* {leaveIcon || removeIcon} */}
			</Group>
		</Card>
	);
}
export default Member;
