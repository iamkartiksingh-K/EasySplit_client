import {
	Card,
	Group,
	Text,
	Avatar,
	Badge,
	Stack,
	Divider,
	Popover,
	Table,
} from "@mantine/core";
import { IconLicense, IconTrash } from "@tabler/icons-react";
function ExpenseCard({
	id,
	title,
	amount,
	payer,
	date,
	group,
	yourSplit,
	paidByUser,
	showBadge,
	allSplits,
	deleteExpense
}) {
	const splitList = allSplits.map((split) => {
		return (
			<Table.Tr key={split?.userId}>
				<Table.Td>{split?.username}</Table.Td>
				<Table.Td>₹{split?.amount}</Table.Td>
			</Table.Tr>
		);
	});
	return (
		<Card withBorder shadow='xs' p='sm' className='w-full'>
			<Group justify='space-between'>
				<Group spacing='sm'>
					<Avatar>
						<IconLicense />
					</Avatar>
					<div>
						<Popover position='bottom' shadow='md'>
							<Popover.Target>
								<Text
									size='lg'
									className='text-sm md:text-lg cursor-pointer'>
									{title}
								</Text>
							</Popover.Target>
							<Popover.Dropdown className=''>
								<Table>
									<Table.Thead>
										<Table.Tr>
											<Table.Th>Username</Table.Th>
											<Table.Th>Split</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>{splitList}</Table.Tbody>
								</Table>
							</Popover.Dropdown>
						</Popover>
						<Group>
							<Text className='text-sm md:text-lg'>{date}</Text>
							{showBadge && (
								<Badge variant='light'>{group}</Badge>
							)}
						</Group>
					</div>
				</Group>
				
				<div className='flex justify-between w-full lg:w-5/12'>
					<Stack justify='flex-start' gap={0} className='w-1/2'>
						<Text size='sm' c='dimmed' className='text-right'>
							Paid by {payer}
						</Text>
						<Text size='lg' fw={600} className='text-right'>
							₹{amount}
						</Text>
					</Stack>
					<Divider orientation='vertical' />
					<Stack justify='flex-start' gap={0} className='w-1/3'>
						<Text size='sm' c='dimmed'>
							{paidByUser ? "You lent" : "You Owe"}
						</Text>
						<Text
							size='lg'
							fw={600}
							c={paidByUser ? "green" : "red"}>
							₹
							{paidByUser
								? amount - yourSplit?.amount
								: yourSplit?.amount || 0}
						</Text>
					</Stack>
					<p className="cursor-pointer flex items-center justify-center text-red-300" onClick={()=>deleteExpense(id)}><IconTrash/></p>
				</div>
			</Group>
		</Card>
	);
}
export default ExpenseCard;
