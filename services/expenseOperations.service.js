import db from "../db/database.connect.js";
import {
  ADD_EXPENSE,
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
} from "../model/database.queries.js";

export async function createExpense(data) {
  const { amount, description, token, categoryId } = data;

  // add expense to the database
  await db.query(ADD_EXPENSE, [categoryId, token, amount, description]);
}

export async function getExpense(data) {
  const { token } = data;

  let [row] = await db.query(GET_EXPENSE, [token]);

  if (!row || row.length == 0) {
    let error = new Error();
    error.code = "No_Expense_Found";
    throw error;
  }

  return row;
}

export async function deleteExpense(data) {
  if (!data || !data?.expenseId) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }
  await db.query(DELETE_EXPENSE, [data?.expenseId]);
}

export async function updateExpense(data) {
  if (!data?.expenseId || !data?.column || !data?.value) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  } else {
    await db.query(UPDATE_EXPENSE, [data.column, data.value, data.expenseId]);
  }
}
