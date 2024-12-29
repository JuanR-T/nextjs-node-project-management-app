"use client";
import useAsync from "@/lib/useAsync";
import { useState } from "react";
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
        //Modal New Task
        <div>
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        // { activeTab === "Board" && <Board /> }
    )
}

export default Project;