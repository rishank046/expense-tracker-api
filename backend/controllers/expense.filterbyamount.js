import db from '../db/database.connect.js';
import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';

export default wrapper(async (req , res) => {
    const {userId , amount} = await parseBody(req);
        const [response] = await db.query(`SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE usr_id = ?` , userId);
        const filteredResponse = response.filter((exp) => {
            if(exp.amount === amount){
                return true;
            }
            else{
                return false;
            }
        })
        
    res.statusCode = 200;
    res.end(JSON.stringify(filteredResponse));
})
