import db from '../db/database.connect.js';

export default async (amount , description , userId) => {
    await db.query(`INSERT INTO ${process.env.EXPENSE_TABLE_NAME} (amnt , dscr , usr_id) VALUES (?, ?, ?)` , [amount , description , userId]) 
 
}
