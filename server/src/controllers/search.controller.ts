import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const search = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {query} = req.query;
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query as string,
                        },
                    },
                    {
                        description: {
                            contains: query as string,
                        },
                    },
                ],
            },
            
        });
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query as string,
                        },
                    },
                    {
                        description: {
                            contains: query as string,
                        },
                    },
                ],
            },
            
        });
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: query as string,
                        },
                    },
                ],
            },
            
        });
        res.json({tasks, projects, users});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: `Error performing search: ${error.message}` });
    }
}