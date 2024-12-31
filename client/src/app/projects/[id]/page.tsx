"use client";
import ModalNewTask from "@/components/ModalNewTask";
import useAsync from "@/lib/useAsync";
import { useState } from "react";
import BoardView from "../boardView";
import ProjectHeader from "../projectHeader";

type Props = {
    params: { id: string }
}

const Project = ({ params }: Props) => {
    const { id } = params;
    const { value: resolvedParams, loading, error } = useAsync(async () => {
        return Promise.resolve(params);
    }, [id]);
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    console.log(isModalNewTaskOpen, "isModalNewTaskOpen")
    return (
        <div>
            <ModalNewTask
                isOpen={isModalNewTaskOpen}
                onClose={() => setIsModalNewTaskOpen(false)}
                id={id}
            />
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
        </div>
    )
}

export default Project;