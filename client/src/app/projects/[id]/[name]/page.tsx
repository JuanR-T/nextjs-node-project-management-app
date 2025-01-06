"use client";
import ModalNewTask from "@/components/ModalNewTask";
import React, { useState } from "react";
import BoardView from "../../boardView";
import ListView from "../../listView";
import ProjectHeader from "../../projectHeader";
import TableView from "../../tableView";
import TimelineView from "../../timelineView";

type Props = {
    params: Promise<{ id: string, name: string }>;
}

const Project = ({ params }: Props) => {
    const resolvedParams = React.use(params);
    const { id, name } = resolvedParams;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div>
            <ModalNewTask
                isOpen={isModalNewTaskOpen}
                onClose={() => setIsModalNewTaskOpen(false)}
                id={id}
            />
            <ProjectHeader projectName={name} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
            {activeTab === "List" && <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
            {activeTab === "Timeline" && <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
            {activeTab === "Table" && <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />}
        </div>
    )
}

export default Project;