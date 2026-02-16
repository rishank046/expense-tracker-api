import db from '../db/database.js';
import 'dotenv/config';

const setExp = async (userId , amount , description) => {
    try{
       await db.query(`INSERT INTO ${process.env.EXPENSE_TABLE_NAME} (amnt , dscr , usr_id) VALUES (?, ?, ?)` , [amount , description , userId]) 
        return 0; 
    } catch (error){
        return 1;
    }
}

export default setExp;
