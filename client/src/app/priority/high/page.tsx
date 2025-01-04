import { Priority } from "@/state/api";
import PriorityComponent from "../../../components/PriorityComponent";

const Urgent = () => {
    return <PriorityComponent priority={Priority.High} />;
};

export default Urgent;