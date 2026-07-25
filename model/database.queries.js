export const CREATE_USER =
  "INSERT INTO User (userName, userEmail, userPassword) VALUES (?, ?, ?)";

export const GET_USER = "SELECT * FROM User WHERE userEmail = ?";
export const CHECK_USER_CREATED = "SELECT userId FROM User WHERE userEmail = ?";

export const ADD_EXPENSE =
  "INSERT INTO Expenses (category_id, userId, amount, description) VALUES (?, ?, ?, ?)";

export const DELETE_EXPENSE = "DELETE FROM Expenses WHERE expense_id = ? AND userId = ?";

export const GET_EXPENSE = `
  SELECT e.expense_id AS expenseId, c.name AS categoryName, e.amount, e.description, e.created_at 
  FROM Expenses AS e
  JOIN Category AS c ON e.category_id = c.id
  WHERE e.userId = ?
  ORDER BY e.created_at DESC
`;

export const UPDATE_EXPENSE_AMOUNT = "UPDATE Expenses SET amount = ? WHERE expense_id = ? AND userId = ?";
export const UPDATE_EXPENSE_DESCRIPTION = "UPDATE Expenses SET description = ? WHERE expense_id = ? AND userId = ?";
export const UPDATE_EXPENSE_CATEGORY = "UPDATE Expenses SET category_id = ? WHERE expense_id = ? AND userId = ?";

export const ADD_LOGIN_TOKEN =
  "INSERT INTO Token (token, userId) VALUES (?, ?)";

export const GET_USER_TOKEN = `
  SELECT token, TIMESTAMPDIFF(HOUR, created_at, CURRENT_TIMESTAMP) AS hours_elapsed 
  FROM Token 
  WHERE userId = ?
`;

export const GET_SUMMARY = `
  SELECT MIN(created_at) AS startDate, MAX(created_at) AS endDate, COALESCE(SUM(amount), 0) AS totalExpense 
  FROM Expenses 
  WHERE userId = ? AND created_at >= ? AND created_at <= ?
`;

export const INSERT_USER_PROFILE = `
  INSERT INTO userProfile (userId, salary, minimum_expense, expense_goal) VALUES (?, ?, ?, ?);
`;

export const DELETE_TOKEN = `
  DELETE FROM Token WHERE token = ?;
`;

export const FILTER_AMOUNT = `
  SELECT amount, description, created_at FROM Expenses WHERE amount <= ? AND userId = ? ORDER BY amount DESC
`;

export const GET_USER_ID_BY_TOKEN = `
  SELECT userId FROM Token WHERE token = ?
`;