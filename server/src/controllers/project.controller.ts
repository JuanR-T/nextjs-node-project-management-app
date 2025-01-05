import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error fetching projects: ${error.message}` });
    }
}
export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {name, description, startDate, endDate} = req.body;
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        res.status(201).json(newProject);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error creating a project: ${error.message}` });
    }
}

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedProject = await prisma.project.delete({
            where: { id: Number(id) },
        });
        res.status(201).json(deletedProject);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error deleting a project: ${error.message}` });
    }
}
