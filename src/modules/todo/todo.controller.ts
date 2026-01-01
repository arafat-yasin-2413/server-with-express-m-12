import { Request, Response } from "express";
import { userServices } from "../user/user.service";
import { todoServices } from "./todo.service";



const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await todoServices.createTodo(user_id, title);
        res.status(201).json({
            success: true,
            message: "todos data inserted Successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getAllTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getAllTodo();
        // console.log("All todos :", result);

        res.status(200).json({
            success: true,
            message: "Data retrieved Successfully",
            data: result.rows,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}

const getTodoById = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodoById(req.params.id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch Todo" });
    }
}


export const todoControllers = {
    createTodo,
    getAllTodo,
    getTodoById,
}