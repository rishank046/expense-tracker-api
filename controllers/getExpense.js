import db from '../db/database.js';
import 'dotenv/config';

const getExpense = async (userId) => {
    try{
            const [expenses] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , [userId]);
            console.log(expenses)
            return expenses;
    }catch (error) {
        console.log(`cannot able to fetch expense data ${error}`);
        return 1;
    }
}

export default getExpense;
