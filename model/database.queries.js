export const CREATE_USER =
  "INSERT INTO User (userName, userEmail, userPassword) VALUES ($1, $2, $3)";

export const GET_USER =
  "SELECT * FROM User WHERE userEmail = $1";

export const CHECK_USER_CREATED =
  "SELECT userId FROM User WHERE userEmail = $1";

export const ADD_EXPENSE =
  "INSERT INTO Expenses (category_id, userId, amount, description) VALUES ($1, $2, $3, $4)";

export const DELETE_EXPENSE =
  "DELETE FROM Expenses WHERE expense_id = $1 AND userId = $2";

export const GET_EXPENSE = `
  SELECT 
    e.expense_id AS expenseId,
    c.name AS categoryName,
    e.amount,
    e.description,
    e.created_at
  FROM Expenses AS e
  JOIN Category AS c ON e.category_id = c.id
  WHERE e.userId = $1
  ORDER BY e.created_at DESC
`;

export const UPDATE_EXPENSE_AMOUNT =
  "UPDATE Expenses SET amount = $1 WHERE expense_id = $2 AND userId = $3";

export const UPDATE_EXPENSE_DESCRIPTION =
  "UPDATE Expenses SET description = $1 WHERE expense_id = $2 AND userId = $3";

export const UPDATE_EXPENSE_CATEGORY =
  "UPDATE Expenses SET category_id = $1 WHERE expense_id = $2 AND userId = $3";

export const ADD_LOGIN_TOKEN =
  "INSERT INTO Token (token, userId) VALUES ($1, $2)";

export const GET_USER_TOKEN = `
  SELECT 
    token,
    EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - created_at)) / 3600 AS hours_elapsed
  FROM Token
  WHERE userId = $1
`;

export const GET_SUMMARY = `
  SELECT 
    MIN(created_at) AS startDate,
    MAX(created_at) AS endDate,
    COALESCE(SUM(amount), 0) AS totalExpense
  FROM Expenses
  WHERE userId = $1
    AND created_at >= $2
    AND created_at <= $3
`;

export const INSERT_USER_PROFILE = `
  INSERT INTO userProfile 
    (userId, salary, minimum_expense, expense_goal)
  VALUES ($1, $2, $3, $4)
`;

export const DELETE_TOKEN = `
  DELETE FROM Token WHERE token = $1
`;

export const FILTER_AMOUNT = `
  SELECT amount, description, created_at
  FROM Expenses
  WHERE amount <= $1
    AND userId = $2
  ORDER BY amount DESC
`;

export const GET_USER_ID_BY_TOKEN = `
  SELECT userId
  FROM Token
  WHERE token = $1
`;
