import database from '../db/database.connect.js';
import 'dotenv/config';

async function getUserIdByToken(realCookie){

    if(!realCookie){
        return null;
    }

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

    if(!session_id) return null;
    // find userId after verifying the token session_id

    const [userId] = await database.query(`
        SELECT * FROM ${process.env.TOKEN_TABLE_NAME} WHERE TOKEN=?
    `,[session_id]) 

    return userId[0].usr_id;
}

export default getUserIdByToken;
