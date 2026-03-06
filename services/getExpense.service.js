import db from '../db/database.connect.js';

export default async (userId) => {
   const [expenses] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , [userId]);
    return expenses;
}
