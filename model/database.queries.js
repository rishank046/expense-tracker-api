export const CREATE_USER =
  "INSERT INTO User (userName, userEmail, userPassword) VALUES (?, ?, ?)";

export const GET_USER =
  "SELECT * FROM User WHERE userEmail = ? AND userPassword = ?";
export const CHECK_USER_CREATED = "SELECT * FROM User WHERE userEmail = ?";

export const ADD_EXPENSE =
  "INSERT INTO Expenses (category_id, userId, amount, description) VALUES (?, (SELECT userId FROM Token WHERE token = ?), ?, ?)";

export const DELETE_EXPENSE = "DELETE FROM Expenses WHERE expense_id = ?";

export const GET_EXPENSE = `
  SELECT c.name AS categoryName, e.amount, e.description, e.created_at 
  FROM Expenses AS e
  JOIN Category AS c ON e.category_id = c.id
  WHERE e.userId = (SELECT userId FROM Token WHERE token = ?)
`;

export const UPDATE_EXPENSE = "UPDATE Expenses SET ? = ? WHERE expenseId = ?";

export const ADD_LOGIN_TOKEN =
  "INSERT INTO Token (token, userId) VALUES (?, ?)";

export const GET_USER_TOKEN = "SELECT * FROM Token WHERE userId = ?";

export const GET_SUMMARY = `
SELECT MIN(created_at) AS startDate , MAX(created_at) AS endDate , SUM(amount) AS totalExpense FROM Expenses WHERE userId = (
SELECT 1 FROM Token WHERE token = ?)
&& created_at > ? && created_at < ?;`;

export const INSERT_USER_PROFILE = `
    INSERT INTO  userProfile (userId , salary , minimum_expense , expense_goal) VALUES (? , ? , ? , ?);
`;
export const DELETE_TOKEN = `
    DELETE FROM Token WHERE token = ?;
`;
export const VERIFY_TOKEN_EXPIRY = `
    SELECT TIMESTAMPDIFF(hour , (
    SELECT created_at FROM Token WHERE token = ?
    ) , CURRENT_TIMESTAMP);
`;
