"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import {
    Priority,
    Project,
    Task,
    useGetProjectsQuery,
    useGetTasksQuery
} from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { useAppSelector } from "../redux";

const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
    const {
        data: tasks,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useGetTasksQuery({ projectId: parseInt("1") });
    const { data: projects, isLoading: isProjectsLoading } =
        useGetProjectsQuery();

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
    if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

    const priorityCount = tasks.reduce(
        (acc: Record<string, number>, task: Task) => {
            const { priority } = task;
            acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
            return acc;
        },
        {},
    );

    const taskDistribution = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }));

    const statusCount = projects.reduce(
        (acc: Record<string, number>, project: Project) => {
            const status = project.endDate ? "Completed" : "Active";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        },
        {},
    );

    const projectStatus = Object.keys(statusCount).map((key) => ({
        name: key,
        count: statusCount[key],
    }));

    const chartColors = isDarkMode
        ? {
            bar: "#8884d8",
            barGrid: "#303030",
            pieFill: "#4A90E2",
            text: "#FFFFFF",
        }
        : {
            bar: "#8884d8",
            barGrid: "#E0E0E0",
            pieFill: "#82ca9d",
            text: "#000000",
        };

    return (
        <div className="bg-gray-100 bg-transparent p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg md:col-span-2 bg-white p-8 shadow-xl dark:bg-dark-secondary">
                    <h2 className="mb-4 text-lg text-center text-slate-900 font-semibold dark:text-white">
                        🚀 Welcome to MindHive's Management Hub ! 🚀
                        <br />
                    </h2>
                    <p className="mb-4 text-justify font-normal dark:text-white">
                        MindHive's Management Hub is a modern project management tool that helps teams plan, track, and manage their work.
                        <strong> I am a developer who is passionate about building tools that help teams work better together.</strong>
                        <br />
                        <br />
                        <hr></hr>
                        <h3 className="py-4 font-bold text-slate-900 dark:text-white">📋 Features</h3>
                        It streamlines workflows, enhances team collaboration, and boosts productivity with features like a dynamic dashboard <strong>NextJS / NodeJS / Mui/ DnDKit</strong>, efficient task and project tracking, customizable workflows, and tasks priority management.
                        <br />
                        <br />
                        <hr></hr>
                        <h3 className="py-4 font-bold text-slate-900 dark:text-white">⚡️ Powered by AWS Services</h3>
                        This app is designed for safety, using AWS best services like, secure user authentication <strong>AWS Cognito</strong>,
                        It ensures data security <strong>AWS RDS</strong> and scalability <strong>AWS Amplify</strong> for the frontend, <strong>AWS EC2</strong> for the backend.
                        <br />
                        <br />
                        This SaaS is a reliable and robust solution for modern project management.
                    </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-xl dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                        Task Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskDistribution}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={chartColors.barGrid}
                            />
                            <XAxis dataKey="name" stroke={chartColors.text} />
                            <YAxis stroke={chartColors.text} />
                            <Tooltip
                                contentStyle={{
                                    width: "min-content",
                                    height: "min-content",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill={chartColors.bar} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-xl dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                        Project Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                                {projectStatus.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-xl dark:bg-dark-secondary md:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                        Your Tasks
                    </h3>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={tasks}
                            columns={taskColumns}
                            checkboxSelection
                            loading={tasksLoading}
                            getRowClassName={() => "data-grid-row"}
                            getCellClassName={() => "data-grid-cell"}
                            className={dataGridClassNames}
                            sx={dataGridSxStyles(isDarkMode)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;