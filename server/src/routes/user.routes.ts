import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:cognitoId", getUser);
router.delete("/:userId", deleteUser);
router.post("/", createUser);

export default router;