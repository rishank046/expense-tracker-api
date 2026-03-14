import db from '../db/database.connect.js';
import crypto from 'node:crypto';
import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';

export default wrapper(async (req , res) => {
    const {email , password} = await parseBody(req);

    if(!email || !password){
        let error = new Error("required fields are missing");
        throw error;
    }

    const createLoginToken = `
        INSERT INTO ${process.env.TOKEN_TABLE_NAME} (token , usr_id) VALUES (? , ?) 
    `
    const [user] = await db.query(`
        SELECT * FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ? AND usr_pswd = ?` , [email , password]);
    
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
            res.writeHead(201 , {
                'Set-Cookie' : `token=${token}; HttpOnly; Path=/;`,
                'Content-Type' : 'text/plain'
            })
            res.end();
        }
        else{
            res.writeHead(200 , {
                'Set-Cookie' : `token=${userToken[0].token}; HttpOnly; Path=/;`,
                'Content-Type' : 'text/plain'
            })
            res.end();
        }
    }
})
