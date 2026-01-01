import express, { Request, Response } from "express";
import { todoControllers } from "./todo.controller";

const router = express.Router();

router.post("/", todoControllers.createTodo);
router.get("/", todoControllers.getAllTodo);
router.get("/:id", todoControllers.getTodoById);
router.put("/:id", todoControllers.updateTodoById);
router.delete("/:id", todoControllers.deleteTodoById);


export const todoRoutes = router;