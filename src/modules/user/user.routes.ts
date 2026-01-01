import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser );
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);
router.put("/:id", userControllers.updateUserById);


export const userRoutes = router;