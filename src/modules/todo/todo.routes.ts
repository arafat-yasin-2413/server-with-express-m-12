import express, { Request, Response } from "express";
import { todoControllers } from "./todo.controller";

const router = express.Router();

router.post("/", todoControllers.createTodo);
// router.get("/", userControllers.getAllUser);
// router.get("/:id", userControllers.getUserById);
// router.put("/:id", userControllers.updateUserById);
// router.delete("/:id", userControllers.deleteUserById);


export const todoRoutes = router;