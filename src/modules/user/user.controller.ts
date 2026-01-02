import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req);
    // const { name, email, password } = req.body;

    try {
        const result = await userServices.createUser(req.body)
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

const getUserById = async (req: Request, res: Response) => {
	// console.log('Req object --------- ***************** -------------');
	// console.log(req);
	// console.log("---------------Req obj printing ends here---------------------------");

	// console.log("req.params = ", req.params.id);
	// res.send({message: "Getting single users id "});

	// const idFromParams = req.params.id;
	try {
		const result = await userServices.getUserById(req.params.id as string)

		console.log(result.rows);

		if (result.rows.length === 0) {
			res.status(404).json({ success: false, message: "User not Found" });
		} else {
			res.status(200).json({
				success: true,
				message: "User has been found.",
				data: result.rows[0],
			});
		}
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
}

const updateUserById = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    // const idFromParams = req.params.id;

    try {
        const result = await userServices.updateUserById(name, email, req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated Successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    // const idFromParams = req.params.id;

    try {
        const result = await userServices.deleteUserById(req.params.id as string);

        console.log("Delete result : -------", result);
        console.log("RowCount : -------", result.rowCount);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted Successfully",
                data: result.rows,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export const userControllers = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
}