import db from '../db/database.js';
import crypto from 'node:crypto';
import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';

export default wrapper(async (req , res) => {
    const {userEmail , userPassword} = await parseBody();

    const createLoginToken = `
        INSERT INTO ${process.env.TOKEN_TABLE_NAME} (token , usr_id) VALUES (? , ?) 
    `
    const [user] = await db.query(`
        SELECT * FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ? AND usr_pswd = ?` , [userEmail , userPassword]);
    
    if(user.length === 0){
       return null; 
    }
    else{
        const userId = user[0].usr_id;
        const [userToken] = await db.query(`
            SELECT * FROM ${process.env.TOKEN_TABLE_NAME} WHERE usr_id = ?
        ` , [userId]);
        
        if(userToken.length === 0){
            const token = crypto.randomBytes(10).toString('hex');
            await db.query(createLoginToken , [token , userId]);
            return token; 
        }
        else{
            return userToken[0].token;
        }
    }
})
