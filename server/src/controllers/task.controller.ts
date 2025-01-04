import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {projectId} = req.query;
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            }
        });
        res.json(tasks);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
    }
}
export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            title,
            description,
            status,
            priority,
            tags,
            startDate,
            dueDate,
            points,
            projectId,
            authorUserId,
            assignedUserId,
        } = req.body;
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        });
        res.status(201).json(newTask);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error creating a task: ${error.message}` });
    }
}

export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {taskId} = req.params;
        const {status} = req.body;
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            }
        });
        res.json(updatedTask);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error updating task: ${error.message}` });
    }
}

export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {userId} = req.params;
        const tasksByUser = await prisma.task.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) },
                ],  
            },
            include: {
                author: true,
                assignee: true,
            }
        })
        res.json(tasksByUser);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error getting tasks by userId: ${error.message}` });
    }
};