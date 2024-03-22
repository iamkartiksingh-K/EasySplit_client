import { useParams } from "react-router-dom";

function GroupDetails() {
	const { groupId } = useParams();
	console.log(groupId);
	return <div>Group</div>;
}
export default GroupDetails;
