import { Router } from "express";
import { createTask, deleteTask, getTasks, getTasksByUser, updateTaskStatus } from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/user/:userId", getTasksByUser);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;