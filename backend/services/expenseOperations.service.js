import getIdByToken from "../controllers/user.idbytoken.js";
import db from "../db/database.connect.js";

export async function createExpense(data) {
  const { amount, description, userId, categoryId } = data;
  if (!userId) {
    throw new Error("no user found");
  }

  // add expense to the database
  await db.query(
    `INSERT INTO ${process.env.EXPENSE_TABLE_NAME} (category_id , userId , amount , description) VALUES (? , ? , ? , ?)`,
    [categoryId, userId, amount, description],
  );

  return 0;
}

export async function getExpense(data) {
  const { userId } = data;
  if (!userId) {
    throw new Error("user not logged in");
  }

  let expString = await db.query(
    `SELECT * FROM ${process.env.EXPENSE_TABLE_NAME} WHERE userId = ?`,
    [userId],
  );

  if (!expString || expString.length == 0) {
    return false;
  }

  return JSON.stringify(expString);
}

export async function deleteExpense(data) {
  if (!data || !data?.expense_id) {
    throw new Error("details are not provided");
  }
  const deleteExpense = `DELETE FROM ${process.env.EXPENSE_TABLE_NAME} WHERE expense_id = ?`;

  db.query(deleteExpense, [data?.expense_id]);

  return 0;
}

export async function updateExpense(data) {
  if (!data || !data?.expenseId) {
    throw new Error("details are not provided");
  } else {
    db.query(
      `DELETE FROM ${process.env.EXPENSE_TABLE_NAME} WHERE expenseId = ?`,
      [data?.expense_id],
    );
    return 0;
  }
}
