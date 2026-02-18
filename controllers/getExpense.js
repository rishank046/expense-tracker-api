import db from '../db/database.js';
import 'dotenv/config';

const getExpense = async (userId) => {
    try{
        const [expenses] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , [userId]);

        let expString = expenses.map(obj => {
            return `${obj.amnt} -> ${obj.dscr}`;
        }).join(' | ');

        return expString;
    }catch (error) {
        console.log(`cannot able to fetch expense data ${error}`);
        return null;
    }
}

export default getExpense;
