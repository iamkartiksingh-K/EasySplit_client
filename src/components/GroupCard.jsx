import { Card, Image, Group, Text, Box, Badge, Button } from "@mantine/core";
function GroupCard({ title, cover, groupId, memberCount }) {
	return (
		<Card
			shadow='md'
			padding={"md"}
			radius='md'
			className='cursor-pointer transition duration-150 ease-in-out hover:-translate-y-1'>
			<Card.Section>
				<Image
					src={cover || "/group_img.jpg"}
					height={160}
					alt='Norway'
				/>
			</Card.Section>
			<Text fw={600}>{title}</Text>
			<Text c='dimmed'>
				Members : <Text span>{memberCount}</Text>
			</Text>
		</Card>
	);
}
export default GroupCard;
