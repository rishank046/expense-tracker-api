import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';

export default wrapper( async (req , res) => {
   const {userName , email , password} = await parseBody(req);
    
    if(!userName || !email || !password){
        const error = new Error("required field are missing")
        error.code = 400;
        throw error;
    }

   const [userRow] = await db.query(`SELECT 1 FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ?`  , [email])

   if(userRow.length === 0){
        await db.query(`INSERT INTO ${process.env.USER_TABLE_NAME} (usr_nm , usr_email , usr_pswd) VALUES (?, ?, ?)` , [userName , email , password]);
        res.statusCode = 201;
        res.end();
    }
    else{
        res.statusCode = 409;
        res.end();
    }
})
