import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser );


router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `
            SELECT * FROM users`
        );
        // console.log("All users :", result);

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

export const userRoutes = router;