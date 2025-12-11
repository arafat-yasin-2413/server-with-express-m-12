import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { Pool } from "pg";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser (middleware)
app.use(express.json());
// app.use(express.urlencoded());

// database connection
const pool = new Pool({
	connectionString: `${process.env.CONNECTION_STRING}`,
});

const initDB = async () => {
	await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            age INT,
            phone VARCHAR(15),
            address TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

	await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        
    `);
};

initDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello Worldddd!");
});

app.get("/users", async (req: Request, res: Response) => {
	
	try {
		const result = await pool.query(
			`
            SELECT * FROM users`,
			
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


app.post("/users", async (req: Request, res: Response) => {
	// console.log(req);
	const { name, email } = req.body;

	try {
		const result = await pool.query(
			`
            INSERT INTO users(name, email) VALUES($1, $2) RETURNING * `,
			[name, email]
		);
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

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
