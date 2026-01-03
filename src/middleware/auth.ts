// This is auth middleware
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
// higher order function
const auth = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			console.log("------ printing from auth middleware file --------");
			if (!token) {
				return res.status(500).json({ message: "You are not allowed" });
			}
			console.log({ authToken: token });
			const decoded = jwt.verify(token, config.jwtSecret as string);
			console.log({ decoded });
			req.user = decoded as JwtPayload;
			return next();
		} catch (err: any) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		}
	};
};

export default auth;
