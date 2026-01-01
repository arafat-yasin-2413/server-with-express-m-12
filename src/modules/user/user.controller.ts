import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req);
    const { name, email } = req.body;

    try {
        const result = await userServices.createUser(name, email)
        // console.log(result.rows[0]);
        // res.send({message: "data inserted"})
        res.status(201).json({
            success: true,
            message: "Data inserted Successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUser();
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
}

export const userControllers = {
    createUser,
    getAllUser,
}