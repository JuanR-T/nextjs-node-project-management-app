import { Router } from "express";
import { createProject, deleteProject, getProjects } from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);


export default router;