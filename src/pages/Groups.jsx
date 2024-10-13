import {
  Grid,
  Title,
  Button,
  Group,
  Modal,
  Input,
  Divider,
} from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import GroupCard from "../components/GroupCard";
import api from "../../api";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRefresh } from "../hooks/useRefresh";
import { IconRefresh } from "@tabler/icons-react";
function Groups() {
  const [groups, setGroups] = useState([]);
  const [value, update] = useRefresh();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [groupName, setGroupName] = useInputState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [memberName, setMemberName] = useInputState("");
  const [cover, setCover] = useInputState("");
  if (!isLoggedIn) return <Navigate to={"../login"} />;

  useEffect(() => {
    api
      .get("groups")
      .then((result) => {
        console.log(result.data);
        setGroups(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [value]);

  const addGroup = async () => {
    console.log(groupMembers);
    try {
      const response = await api.post("/groups", {
        name: groupName,
        members: groupMembers,
        cover:
          cover ||
          "https://images.unsplash.com/photo-1514810771018-276192729582?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      });
      console.log(response);
      setGroups([...groups, response.data.data]);
      close();
      setGroupMembers([]);
      setGroupName("");
    } catch (error) {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    }
  };
  const addMember = async () => {
    api
      .get(`/users/search/${memberName}`)
      .then(({ data }) => {
        console.log(data.data._id);
        console.log(memberName);
        if (
          groupMembers.find(({ userId }) => {
            console.log(userId);
            return userId === data.data._id;
          }) !== undefined
        ) {
          notifications.show({
            title: "User already in the group",
          });
        } else if (data.data._id === userId) {
          notifications.show({
            title: "You are already in the group",
          });
        } else {
          setGroupMembers([
            ...groupMembers,
            {
              userId: data.data._id,
              username: data.data.username,
            },
          ]);
          notifications.show({
            title: "Member added!",
            color: "green",
          });
          setMemberName("");
        }
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: error.response.data.message,
          color: "red",
        });
      });
  };
  const renderedGroups = groups?.map((group) => {
    console.log(group.memberCount);
    return (
      <Grid.Col span={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={group._id}>
        <Link to={`${group._id}`}>
          <GroupCard
            coverImg={group.cover}
            groupId={group._id}
            title={group.name}
            memberCount={group.memberCount}
            balance={group.balance}
          />
        </Link>
      </Grid.Col>
    );
  });
  return (
    <>
      <Modal
        className="p-5"
        opened={opened}
        onClose={close}
        centered
        size={"sm"}
        withCloseButton={false}
      >
        <Title order={2} mb={"sm"}>
          Details
        </Title>
        <Input.Wrapper label="Group Name" size="md">
          <Input size="md" value={groupName} onChange={setGroupName} />
        </Input.Wrapper>
        <Input.Wrapper label="Group Members" size="md" className="mt-3">
          <Input
            size="md"
            className="grow"
            rightSectionPointerEvents="all"
            value={memberName}
            onChange={setMemberName}
            rightSection={
              <IconPlus className="cursor-pointer" onClick={addMember} />
            }
          />
        </Input.Wrapper>
        <Input.Wrapper label="Group Cover" size="md" className="mt-3">
          <Input size="md" className="grow" value={cover} onChange={setCover} />
        </Input.Wrapper>
        <Button
          color="#17CF97"
          size="md"
          fullWidth
          onClick={addGroup}
          className="mt-5"
        >
          Submit
        </Button>
      </Modal>
      <Group justify="space-between" m={"md"}>
        <Title>My Groups</Title>
        <Group>
          <Button variant="light">
            <IconRefresh onClick={update} />
          </Button>
          <Button
            color={"myColor"}
            onClick={open}
            leftSection={<IconPlus size={20} />}
          >
            Add Group
          </Button>
        </Group>
      </Group>
      <Divider />
      <Grid className="mt-8">{renderedGroups}</Grid>
    </>
  );
}
export default Groups;
