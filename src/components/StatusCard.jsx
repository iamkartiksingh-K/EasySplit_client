import { ThemeIcon, Title, Text, Group, Paper } from "@mantine/core";
function StatusCard({ title, value, color, icon, iconColor, className }) {
	return (
		<Paper
			withBorder
			radius={"md"}
			p={"md"}
			shadow='sm'
			className={className}>
			<Group>
				<ThemeIcon
					className='mr-5'
					radius={"xl"}
					size={"xl"}
					color={iconColor}>
					{icon}
				</ThemeIcon>
				<div>
					<Title order={3}>{title}</Title>
					<Text size='xl' fw={700} c={color}>
						₹{value}
					</Text>
				</div>
			</Group>
		</Paper>
	);
}
export default StatusCard;
