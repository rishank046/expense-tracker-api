import db from "../db/database.connect.js";
import {
  ADD_EXPENSE,
  GET_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE_AMOUNT,
  UPDATE_EXPENSE_DESCRIPTION,
  UPDATE_EXPENSE_CATEGORY,
  GET_SUMMARY,
  FILTER_AMOUNT,
} from "../model/database.queries.js";

export async function createExpense(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const { amount, description, categoryId } = req.body || {};

  if (!userId || !amount || !description || !categoryId) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  await db.query(ADD_EXPENSE, [categoryId, userId, amount, description]);
  return res.status(201).json({ message: "Expense added successfully" });
}

export async function getExpense(req, res, next) {
  const userId = req.userId || req.body?.userId;

  if (!userId) {
    let error = new Error();
    error.code = "Unauthorized";
    throw error;
  }

  const { rows } = await db.query(GET_EXPENSE, [userId]);
  return res.status(200).json(rows);
}

export async function deleteExpense(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const { expenseId } = req.body || {};

  if (!userId || !expenseId) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  await db.query(DELETE_EXPENSE, [expenseId, userId]);
  return res.status(200).json({ message: "Expense deleted successfully" });
}

export async function updateExpense(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const { column, value, expenseId } = req.body || {};

  if (!userId || !column || value === undefined || !expenseId) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  let query;
  if (column === "amount") {
    query = UPDATE_EXPENSE_AMOUNT;
  } else if (column === "description") {
    query = UPDATE_EXPENSE_DESCRIPTION;
  } else if (column === "category_id" || column === "categoryId") {
    query = UPDATE_EXPENSE_CATEGORY;
  } else {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  await db.query(query, [value, expenseId, userId]);
  return res.status(200).json({ message: "Expense updated successfully" });
}

export async function getSummary(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const startDate = req.query?.startDate || req.body?.startDate || "1970-01-01";
  const endDate = req.query?.endDate || req.body?.endDate || "2099-12-31";

  if (!userId) {
    let error = new Error();
    error.code = "Unauthorized";
    throw error;
  }

  const { rows: summary } = await db.query(GET_SUMMARY, [userId, startDate, endDate]);
  return res.status(200).json(summary[0] || { startDate: null, endDate: null, totalExpense: 0 });
}

export async function filterAmount(req, res, next) {
  const userId = req.userId || req.body?.userId;
  const amount = req.query?.amount || req.body?.amount;

  if (!userId || !amount) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  }

  const { rows: filteredResponse } = await db.query(FILTER_AMOUNT, [amount, userId]);
  return res.status(200).json(filteredResponse);
}