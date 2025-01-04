import { Priority } from "@/state/api";
import PriorityComponent from "../../../components/PriorityComponent";

const Urgent = () => {
    return <PriorityComponent priority={Priority.Backlog} />;
};

export default Urgent;