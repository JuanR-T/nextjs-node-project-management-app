"use client";
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
    return (
        <div>
            {/* Modal New Task */}
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
        </div>
    )
}

export default Project;