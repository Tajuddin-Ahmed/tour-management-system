import { Router } from "express";
import { usersController } from "./user.controller";

const router = Router();
router.post("/register", usersController.createUser);
router.get("/all-users", usersController.getAllUsers);
export const userRoutes = router;
