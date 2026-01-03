import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userControllers.createUser );
router.get("/", logger, auth("admin"), userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);
router.put("/:id", userControllers.updateUserById);
router.delete("/:id", userControllers.deleteUserById);


export const userRoutes = router;