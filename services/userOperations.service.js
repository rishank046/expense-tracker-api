import db from "../db/database.connect.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import {
  GET_USER,
  ADD_LOGIN_TOKEN,
  CREATE_USER,
  GET_USER_TOKEN,
  INSERT_USER_PROFILE,
  DELETE_TOKEN,
} from "../model/database.queries.js";

const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

export async function userLogIn(req, res, next) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const { rows: users } = await db.query(GET_USER, [email]);
  if (!users || users.length === 0) {
    let error = new Error();
    error.code = "No_User_Found";
    throw error;
  }

  const user = users[0];
  const userPasswordHash = user.userPassword || user.userpassword;
  const isMatch = await bcrypt.compare(password, userPasswordHash);
  if (!isMatch) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const userId = user.userId ?? user.userid;
  const { rows: tokenRows } = await db.query(GET_USER_TOKEN, [userId]);
  let activeToken = tokenRows[0];

  if (activeToken && Number(activeToken.hours_elapsed) < 24) {
    res.cookie("token", activeToken.token, COOKIE_OPTIONS);
    return res.status(200).json({ message: "Login successful", token: activeToken.token });
  }

  if (activeToken) {
    await db.query(DELETE_TOKEN, [activeToken.token]);
  }

  const newToken = crypto.randomBytes(32).toString("hex");
  await db.query(ADD_LOGIN_TOKEN, [newToken, userId]);

  res.cookie("token", newToken, COOKIE_OPTIONS);
  return res.status(200).json({ message: "Login successful", token: newToken });
}

export async function userSignIn(req, res, next) {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(CREATE_USER, [name, email, hashedPassword]);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062 || err.code === "23505") {
      let error = new Error();
      error.code = "User_Already_Exists";
      throw error;
    }
    throw err;
  }
}

export async function setupProfile(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const { salary, minimumExpense, expenseGoal } = req.body || {};

  if (!userId || salary === undefined || minimumExpense === undefined || expenseGoal === undefined) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  await db.query(INSERT_USER_PROFILE, [userId, salary, minimumExpense, expenseGoal]);
  return res.status(200).json({ message: "Profile created successfully" });
}
