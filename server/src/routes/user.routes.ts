import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:cognitoId", getUser);
router.post("/", createUser);

export default router;