import db from "../db/database.connect.js";
import crypto from "node:crypto";
import {
  CHECK_USER_CREATED,
  GET_USER,
  ADD_LOGIN_TOKEN,
  CREATE_USER,
  GET_USER_TOKEN,
  INSERT_USER_PROFILE,
  VERIFY_TOKEN_EXPIRY,
  DELETE_TOKEN,
} from "../model/database.queries.js";

export async function userLogIn(data) {
  const { email, password } = data;

  if (!email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const [user] = await db.query(GET_USER, [email, password]);

  if (user.length === 0) {
    let error = new Error();
    error.code = "No_User_Found";
    throw error;
  } else {
    const userId = user[0].userId;
    const [userToken] = await db.query(GET_USER_TOKEN, [userId]);

    if (userToken.length === 0) {
      const token = crypto.randomBytes(10).toString("hex");
      await db.query(ADD_LOGIN_TOKEN, [token, userId]);
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

  const [userRow] = await db.query(CHECK_USER_CREATED, [email]);

  if (userRow.length === 0) {
    await db.query(CREATE_USER, [userName, email, password]);
  } else {
    let error = new Error();
    error.code = "User_Already_Exists";
    throw error;
  }
}

export async function setupProfile(data) {
  const { userId, salary, minimumExpense, expenseGoal } = data;
  if (!userId || !salary || !minimumExpense || !expenseGoal) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }
  db.query(INSERT_USER_PROFILE, [userId, salary, minimumExpense, expenseGoal]);
}
