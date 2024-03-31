import { Popover, Flex, Input, Button, Space } from "@mantine/core";
function Edit({ label, onClick, value, setValue, children }) {
	return (
		<Popover width={200} position='bottom' withArrow shadow='md'>
			<Popover.Target>{children}</Popover.Target>
			<Popover.Dropdown>
				<Input.Wrapper label={label}>
					<Input value={value} onChange={setValue}></Input>
				</Input.Wrapper>
				<Space h={"sm"} />
				<Button onClick={onClick} size='sm' fullWidth>
					Update
				</Button>
			</Popover.Dropdown>
		</Popover>
	);
}
export default Edit;
