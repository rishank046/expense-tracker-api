import db from '../db/database.connect.js';
import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';
import getUserIdByToken from './user.idbytoken.js';

export default wrapper(async (req , res) => {
    const {amount} = await parseBody(req);
    const userId = await getUserIdByToken(req.headers.cookie);

    const [filteredResponse] = await db.query(`SELECT amnt , dscr FROM ${process.env.EXPENSE_TABLE_NAME} WHERE amnt <= ? AND usr_id= ?` , [amount , userId]);
        
    res.statusCode = 200;
    res.end(JSON.stringify(filteredResponse));
})
