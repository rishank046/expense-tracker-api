import db from '../db/database.js';
import 'dotenv/config'

const getFilteredData = async (userId , amount) => {
    try{
        const [response] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , userId);
        const filteredResponse = response.filter((exp) => {
            if(exp.amount === amount){
                return true;
            }
            else{
                return false;
            }
        })
        
        console.log(filteredResponse)
        return filteredResponse;
    }
    catch (error){
        return error;
    }
}
