import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
}
export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}
export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
}
export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}
export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}
export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId?: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}
export interface Comment {
    id: number;
    taskId: number;
    text: string;
    userId: number;
}
export interface SearchResults {
    tasks: Task[];
    projects: Project[];
    users: User[];
}
export interface Team {
    teamId: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
}
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    tagTypes: ["Projects", "Tasks", "Users", "Teams", "UserTasks"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            //This invalidates the Projects tag so that the getProjects query will refetch the data after creating a new project
            invalidatesTags: ["Projects"],
        }),
        deleteProject: build.mutation<Project, number>({
            query: (projectId) => ({
                url: `projects/${projectId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) =>
                result
                    ? result.map(({ id }) => ({
                          type: "Tasks" as const,
                          id,
                      }))
                    : [{ type: "Tasks" as const }],
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            //This invalidates the tasks tag so that the getTasks query will refetch the data after creating a new task
            invalidatesTags: [
                { type: "UserTasks" },
                { type: "Tasks" },
            ],
        }),
        updateTaskStatus: build.mutation<
            Task,
            { taskId: number; status: string }
        >({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId },
            ],
        }),
        search: build.query<SearchResults, { query: string }>({
            query: ({ query }) => `search?query=${query}`,
        }),
        getUsers: build.query<User[], void>({
            query: () => "users",
            providesTags: ["Users"],
        }),
        getTeams: build.query<Team[], void>({
            query: () => "teams",
            providesTags: ["Teams"],
        }),
        getTasksByUser: build.query<Task[], number>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result) =>
                result?.map(({ id }) => ({
                    type: "UserTasks",
                    id,
                })) || [{ type: "UserTasks" }],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetTasksByUserQuery,
} = api;
