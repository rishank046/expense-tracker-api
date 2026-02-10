import db from '../db/database.js';
import 'dotenv/config';

const addExp = async (email , password) => {
    try{
        const [user] = await db.query(`SELECT * FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ? AND usr_pswd = ?`,[email,password]);
            const userId = user[0].usr_id;
            const [expenses] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , userId);
            return expenses;
    }catch (error) {
        console.log(`cannot able to fetch expense data ${error}`);
        return 1;
    }
}

export default addExp;
