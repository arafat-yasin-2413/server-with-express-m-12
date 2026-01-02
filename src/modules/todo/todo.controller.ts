import { Request, Response } from "express";
import { userServices } from "../user/user.service";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
	// const { user_id, title } = req.body;

	try {
		const result = await todoServices.createTodo(req.body);
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
};

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
};

const updateTodoById = async (req: Request, res: Response) => {
	const { title, completed } = req.body;

	try {
		const result = await todoServices.updateTodoById(title, completed, req.params.id as string);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Todo not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to update Todo" });
	}
};

const deleteTodoById = async (req: Request, res: Response) => {
	try {
		const result = await todoServices.deleteTodoById(req.params.id as string);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Todo not found" });
		}
		res.json({ success: true, message: "Todo deleted", data: null });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to delete Todo" });
	}
}

export const todoControllers = {
	createTodo,
	getAllTodo,
	getTodoById,
	updateTodoById,
    deleteTodoById,
};
