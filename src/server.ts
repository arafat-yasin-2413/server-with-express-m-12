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
// app.use(express.urlencoded()); // to handle form data

// initializing DB
initDB();

// logger middleware


app.get("/", logger, (req: Request, res: Response) => {
	res.send("Hello Worldddd!");
});

// CRUD 
app.use("/users",userRoutes)
app.use("/todos",todoRoutes);


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
