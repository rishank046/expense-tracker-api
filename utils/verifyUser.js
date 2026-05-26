import db from "../db/database.connect.js";
import bcrypt from "bcrypt";
import { GET_USER_ID_BY_TOKEN } from "../model/database.queries.js";

export default async function verifyUser(req , res , next){
    const { token } = req.body;
    if(!token){
        let error = new Error();
        error.code = "Missing_Required_Fields";
        throw error;
    }

    const [user] = await db.query(GET_USER_ID, [token]);

    if(user.length === 0){
        let error = new Error();
        error.code = "Unauthorized";
        throw error;
    }
    else{
        req.body.userId = user[0].userId;
        next();
    }

}