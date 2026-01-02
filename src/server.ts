import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";


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

// auth routes
app.use("/auth",authRoutes);

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
