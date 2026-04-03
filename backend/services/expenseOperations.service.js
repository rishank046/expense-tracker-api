import db from "../db/database.connect.js";

export async function createExpense(data) {
  const { amount, description, sessionId, categoryId } = data;

  // add expense to the database
  await db.query(
    `INSERT INTO ${process.env.EXPENSE_TABLE_NAME} (category_id , userId , amount , description) VALUES (? , (
        SELECT userId FROM Token WHERE token = ? 
    ) , ? , ?)`,
    [categoryId, sessionId, amount, description],
  );
}

export async function getExpense(data) {
  const { token } = data;

  let [row] = await db.query(
    `SELECT e.expense_id , c.name AS categoryName , e.amount , e.description , e.created_at FROM ${process.env.EXPENSE_TABLE_NAME} AS e
        JOIN Category AS c ON e.category_id = c.id
        WHERE e.userId = (
            SELECT userId FROM Token WHERE token = ?
        )`,
    [token],
  );

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
  const deleteExpense = `DELETE FROM ${process.env.EXPENSE_TABLE_NAME} WHERE expense_id = ?`;

  db.query(deleteExpense, [data?.expenseId]);
}

export async function updateExpense(data) {
  if (!data || !data?.expenseId) {
    let error = new Error();
    error.code = "Missing_Required_Fields";
    throw error;
  } else {
    db.query(
      `DELETE FROM ${process.env.EXPENSE_TABLE_NAME} WHERE expenseId = ?`,
      [data?.expense_id],
    );
  }
}
