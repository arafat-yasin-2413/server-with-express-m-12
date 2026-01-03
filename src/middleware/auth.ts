// This is auth middleware
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
// higher order function
const auth = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ")[1];
		console.log("------ printing from auth middleware file --------");
		if (!token) {
			return res.status(500).json({ message: "You are not allowed" });
		}
		console.log({ authToken: token });
		const decoded = jwt.verify(token, config.jwtSecret as string);
		console.log({ decoded });
		return next();
	};
};

export default auth;
