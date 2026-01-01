import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";


const app = express();
const port = config.port;

// parser (middleware)
app.use(express.json());
// app.use(express.urlencoded());


// initializing DB
initDB();

// logger middleware


app.get("/", logger, (req: Request, res: Response) => {
	res.send("Hello Worldddd!");
});

// ------------------- users crud ops starts here --------------------

app.use("/users",userRoutes)

// ------------------- users crud ops ends here --------------------

// ------------------- todos crud ops starts here --------------------
app.use("/todos",todoRoutes);

app.get("/todos", async (req: Request, res: Response) => {
	try {
		const result = await pool.query(
			`
            SELECT * FROM todos`
		);
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
});

// get single todo
app.get("/todos/:id", async (req: Request, res: Response) => {
	try {
		const result = await pool.query(
			`
                SELECT * FROM todos WHERE id = $1
            `,
			[req.params.id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Todo not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch Todo" });
	}
});

// update todo
app.put("/todo/:id", async (req: Request, res: Response) => {
	const { title, completed } = req.body;

	try {
		const result = await pool.query(
			`
                UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *
            `,
			[title, completed, req.params.id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Todo not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to update Todo" });
	}
});

// delete todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
	try {
		const result = await pool.query(
			`
                DELETE FROM todos WHERE id=$1 RETURNING *
            `,
			[req.params.id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Todo not found" });
		}
		res.json({ success: true, message: "Todo deleted", data: null });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to delete Todo" });
	}
});

// Not Found route
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
		path: req.path,
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
