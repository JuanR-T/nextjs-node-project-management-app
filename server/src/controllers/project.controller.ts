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
        res.status(500).json({ error: "An error occurred while fetching projects" });
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
        res.status(500).json({ error: "An error occurred while creating project" });
    }
}

