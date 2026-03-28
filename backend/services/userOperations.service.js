import db from "../db/database.connect.js";
import crypto from "node:crypto";

export async function userLogIn(data) {
  const { email, password } = data;

  if (!email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const createLoginToken = `
        INSERT INTO ${process.env.TOKEN_TABLE_NAME} (token , usr_id) VALUES (? , ?) 
    `;
  const [user] = await db.query(
    `
        SELECT * FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ? AND usr_pswd = ?`,
    [email, password],
  );

  if (user.length === 0) {
    let error = new Error();
    error.code = "No_User_Found";
    throw error;
  } else {
    const userId = user[0].usr_id;
    const [userToken] = await db.query(
      `
            SELECT * FROM ${process.env.TOKEN_TABLE_NAME} WHERE usr_id = ?
        `,
      [userId],
    );

    if (userToken.length === 0) {
      const token = crypto.randomBytes(10).toString("hex");
      await db.query(createLoginToken, [token, userId]);
      return token;
    } else {
      return userToken[0].token;
    }
  }
}

export async function userSignIn(data) {
  const { userName, email, password } = data;

  if (!userName || !email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const [userRow] = await db.query(
    `SELECT 1 FROM ${process.env.USER_TABLE_NAME} WHERE usr_email = ?`,
    [email],
  );

  if (userRow.length === 0) {
    await db.query(
      `INSERT INTO ${process.env.USER_TABLE_NAME} (usr_nm , usr_email , usr_pswd) VALUES (?, ?, ?)`,
      [userName, email, password],
    );
  } else {
    let error = new Error();
    error.code = "User_Already_Exists";
    throw error;
  }
}
