import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

const loginUser = async(email: string, password: string) =>{

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,[email])

    console.log('----------printing from auth.services--------')
    console.log(result);
    if(result.rows.length === 0) {
        return null;
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password,user.password);

    if(!match) {
        return false;
    }
    
    
}