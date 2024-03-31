import { Modal, Input, Button } from "@mantine/core";
import { useInputState, useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
function AddMemberModal({ onSubmit, isOpen, setIsOpen }) {
	const [member, setMember] = useInputState("");
	const [opened, { open, close }] = useDisclosure(false);
	useEffect(() => {
		open();
	}, [isOpen]);
	return (
		<Modal
			opened={opened}
			onClose={() => {
				setIsOpen(false);
				close();
			}}
			withCloseButton={false}>
			<Input.Wrapper label='Member Name' size='lg'>
				<Input value={member} onChange={setMember} />
				<Button fullWidth>Add</Button>
			</Input.Wrapper>
		</Modal>
	);
}
export default AddMemberModal;
