import db from "../db/database.connect.js";
import {
  ADD_EXPENSE,
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  GET_SUMMARY,
  FILTER_AMOUNT,
} from "../model/database.queries.js";

export async function createExpense(req , res , next) {
  const { amount, description, token, categoryId } = req.body;
  if(!amount || !description || !token || !categoryId){
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  // add expense to the database
  await db.query(ADD_EXPENSE, [categoryId, token, amount, description]);
  res.status(200).end();
}

export async function getExpense(req , res , next) {
  const { token } = req.body;

  let [row] = await db.query(GET_EXPENSE, [token]);

  res.status(200).json(row);
}


export async function deleteExpense(req , res , next) {
  const { expenseId } = req.body;
  if(!expenseId){
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  await db.query(DELETE_EXPENSE, [expenseId]);

  res.status(200).end();
}

export async function updateExpense(req , res , next) {
 const {column , value , expenseId} = req.body; 
 if(!column , !value , !expenseId){
  let error = new Error();
  error.code = "Missing_Required_Fields";
  throw error;
 }

  await db.query(UPDATE_EXPENSE, [column, value, expenseId]);

  res.status(200).end();
}

export async function getSummary(req , res , next) {
  const { token, startDate, endDate } = req.body;

  let [summary] = await db.query(GET_SUMMARY, [token, startDate, endDate]);

  res.status(200).json(summary);
}

export async function filterAmount(req , res){
  const { amount } = req.body;
  if(!amount){
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }
    const userId = await getUserIdByToken(req.headers.cookie);

    let [filteredResponse] = await db.query(FILTER_AMOUNT , [amount , userId]);

    res.status(200).json(filteredResponse);
}