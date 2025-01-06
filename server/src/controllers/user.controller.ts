import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;
  console.log(cognitoId, "cognitoId");
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    console.log(user, "user is here");
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    console.log(username, cognitoId, profilePictureUrl, teamId, "username, cognitoId, profilePictureUrl, teamId");
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    console.log(newUser, "newUser");
    res.json({ message: "User Created Successfully", newUser });
  } catch (error: any) {
    res
        .status(500)
        .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({
      where: {
        userId: Number(userId),
      },
    });
    res.json({ message: "User Deleted Successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting user: ${error.message}` });
  }
}