import { Modal, Table, Flex, Text } from "@mantine/core";
import { IconChecklist } from "@tabler/icons-react";
function SettleExpenses({ isOpen, closeModal, children }) {
	const render = children?.length ? (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Payer</Table.Th>
					<Table.Th>Payee</Table.Th>
					<Table.Th>Amount</Table.Th>
					<Table.Th>Action</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{children}</Table.Tbody>
		</Table>
	) : (
		<Flex justify={"center"} align={"center"} direction={"column"}>
			<div>
				<IconChecklist className='size-32' color='#228be6' />
			</div>
			<Text fw={500} size='xl' m={"md"} ta={"center"}>
				All Settled
			</Text>
		</Flex>
	);
	return (
		<Modal
			opened={isOpen}
			onClose={closeModal}
			withCloseButton={false}
			centered
			radius={"md"}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}>
			{render}
		</Modal>
	);
}
export default SettleExpenses;
