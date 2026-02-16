import database from '../db/database.js';
import 'dotenv/config';

async function getUserIdByToken(realCookie){
    let userId; 
    const session_id = realCookie
        .split('; ')
        .filter(function (element){
            const arr = element.split('=');
            if(arr[0] === 'session_id'){
                return true;
            }
            else return false;
        })[0]
        ?.split('=')[1];
    // find userId after verifying the token session_id
    [userId] = await database.query(`
        SELECT * FROM ${process.env.TOKEN_TABLE_NAME} WHERE TOKEN=?
    `,[session_id]) 
    console.log(userId[0].usr_id)
    return userId;
}

export default getUserIdByToken;
