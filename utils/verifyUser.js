import db from "../db/database.connect.js";
import { GET_USER_ID_BY_TOKEN } from "../model/database.queries.js";

export default async function verifyUser(req, res, next) {
    const token = req.cookies?.token || req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
        let error = new Error();
        error.code = "No_Session_Id_Found";
        throw error;
    }

    const { rows } = await db.query(GET_USER_ID_BY_TOKEN, [token]);

    if (!rows || rows.length === 0) {
        let error = new Error();
        error.code = "Unauthorized";
        throw error;
    }

    const userId = rows[0].userId ?? rows[0].userid;
    req.userId = userId;
    if (req.body && typeof req.body === 'object') {
        req.body.userId = userId;
    }
    next();
}
