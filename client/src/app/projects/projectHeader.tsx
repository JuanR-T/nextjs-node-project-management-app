import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useDeleteProjectMutation, useGetProjectsQuery } from "@/state/api";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Clock, Grid3X3, List, PlusSquare, Table, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../redux";
import ModalNewProject from "./modalNewProject";

type Props = {
    projectName: string;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}

const ProjectHeader = ({ projectName, activeTab, setActiveTab }: Props) => {
    const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const [deleteProject, { isLoading }] = useDeleteProjectMutation();
    const handleDelete = async (id: number) => {
        try {
            await deleteProject(id).unwrap();
        } catch (error) {
            console.error('Failed to delete the project:', error);
        }
    };
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "name",
            width: 100,
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
        },
        {
            field: "startDate",
            headerName: "Start Date",
            width: 130,
        },
        {
            field: "endDate",
            headerName: "End Date",
            width: 130,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <button
                    onClick={() => handleDelete(params.row.id)}
                    disabled={isLoading}
                >
                    <Trash2 className="mr-2 h-5 w-5" />
                </button>
            ),
        },
    ];
    const {
        data: projects,
        isLoading: isProjectsLoading,
        error,
        isSuccess,
    } = useGetProjectsQuery();

    return (
        <>
            <ModalNewProject
                isOpen={isModalNewProjectOpen}
                onClose={() => setIsModalNewProjectOpen(false)}
            />
            <div className="px-4 xl:px-6">
                <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
                    <Header
                        name="Projects Overview"
                        buttonComponent={
                            <button
                                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                                onClick={() => setIsModalNewProjectOpen(true)}
                            >
                                <PlusSquare className="mr-2 h-5 w-5" /> New Project
                            </button>
                        }
                    />

                </div>
                <div className="z-0 w-full">
                    <DataGrid
                        rows={projects}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row) => row.id}
                        className={dataGridClassNames}
                        sx={dataGridSxStyles(isDarkMode)}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                    />
                </div>
                {/** Tabs */}
                <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
                    <div className="flex flex-col">
                        <h1 className={`text-2xl p-2 text-black font-semibold dark:text-white`}>
                            Project : {projectName}
                        </h1>
                        <div className="flex flex-1 items-center gap-2 md:gap-4">
                            <TabButton name="Board" icon={<Grid3X3 className="h-5 w-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton name="List" icon={<List className="h-5 w-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton name="Timeline" icon={<Clock className="h-5 w-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton name="Table" icon={<Table className="h-5 w-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

type TabButtonProps = {
    name: string;
    icon: React.ReactNode;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}
const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
    const isActive = activeTab === name;
    return (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex items-center relative gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? 'text-blue-600 after:bg-blue-600 dark:text-white' : ''}`}
        >
            {icon}
            {name}
        </button>
    )
}

export default ProjectHeader