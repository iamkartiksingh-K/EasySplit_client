import {
	Card,
	Image,
	Group,
	Text,
	Box,
	Badge,
	Button,
	Divider,
	Space,
	Stack,
} from "@mantine/core";
function GroupCard({ title, memberCount, balance, coverImg }) {
	return (
		<Card
			shadow='md'
			padding={"md"}
			radius='md'
			className='cursor-pointer transition duration-150 ease-in-out hover:-translate-y-1'>
			<Card.Section>
				<Image
					mah={180}
					src={
						coverImg ||
						"https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					}
					h={180}
				/>
			</Card.Section>
			<Group justify='space-between' mt={"md"}>
				<Text fw={600} size='lg'>
					{title}
				</Text>
				<Badge size={"lg"} variant='light'>
					Members : {memberCount}
				</Badge>
			</Group>

			<Space h='md' />
			<Divider />
			<Space h={"md"} />
			<Group gap={"sm"} justify='space-between'>
				<div>
					<Text size='sm' fw={600} c={"dimmed"}>
						Balance
					</Text>
					<Text c={"dimmed"} size='sm' fw={600}>
						₹ {balance?.youAreOwed - balance?.youOwe || 0}
					</Text>
				</div>

				<div>
					<Text size='sm' fw={600} c={"dimmed"}>
						You Owe
					</Text>
					<Text c={"red"} size='sm' fw={600}>
						₹ {balance?.youOwe || 0}
					</Text>
				</div>

				<div>
					<Text size='sm' fw={600} c={"dimmed"}>
						You Lent
					</Text>
					<Text c={"green"} size='sm' fw={600}>
						₹ {balance?.youAreOwed || 0}
					</Text>
				</div>
			</Group>
		</Card>
	);
}
export default GroupCard;
