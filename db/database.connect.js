import mysql from "mysql2";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const caPath = path.resolve(__dirname, "../ca.pem");

let dbExport;

if (process.env.LOCAL_DB === "true" || !process.env.DB_HOST) {
  const users = [];
  const tokens = [];
  const expenses = [];
  const categories = [{ id: 1, name: "Housing" }, { id: 2, name: "Food" }, { id: 3, name: "Utilities" }];
  const userProfiles = [];

  let userIdCounter = 1;
  let expenseIdCounter = 1;

  dbExport = {
    async query(sql, params = []) {
      const trimmed = sql.trim().replace(/\s+/g, " ");

      if (trimmed.startsWith("CREATE TABLE")) {
        return [{ affectedRows: 0 }];
      }

      if (trimmed.includes("FROM Token WHERE token =")) {
        const tokenVal = params[0];
        const match = tokens.filter(t => t.token === tokenVal);
        return [match];
      }

      if (trimmed.includes("FROM User WHERE userEmail =")) {
        const email = params[0];
        const match = users.filter(u => u.userEmail === email);
        return [match];
      }

      if (trimmed.startsWith("INSERT INTO User")) {
        const [userName, userEmail, userPassword] = params;
        if (users.some(u => u.userEmail === userEmail)) {
          const err = new Error("Duplicate entry");
          err.code = "ER_DUP_ENTRY";
          err.errno = 1062;
          throw err;
        }
        const newUser = { userId: userIdCounter++, userName, userEmail, userPassword };
        users.push(newUser);
        return [{ insertId: newUser.userId, affectedRows: 1 }];
      }

      if (trimmed.includes("hours_elapsed") && trimmed.includes("FROM Token")) {
        const uId = params[0];
        const match = tokens.filter(t => t.userId === uId).map(t => ({
          token: t.token,
          hours_elapsed: Math.floor((Date.now() - t.created_at.getTime()) / (1000 * 60 * 60))
        }));
        return [match];
      }

      if (trimmed.startsWith("INSERT INTO Token")) {
        const [token, uId] = params;
        const idx = tokens.findIndex(t => t.userId === uId);
        if (idx !== -1) tokens.splice(idx, 1);
        tokens.push({ token, userId: uId, created_at: new Date() });
        return [{ affectedRows: 1 }];
      }

      if (trimmed.startsWith("DELETE FROM Token")) {
        const token = params[0];
        const idx = tokens.findIndex(t => t.token === token);
        if (idx !== -1) tokens.splice(idx, 1);
        return [{ affectedRows: 1 }];
      }

      if (trimmed.startsWith("INSERT INTO Expenses")) {
        const [category_id, uId, amount, description] = params;
        const newExpense = {
          expense_id: expenseIdCounter++,
          category_id: Number(category_id),
          userId: Number(uId),
          amount: Number(amount),
          description,
          created_at: new Date()
        };
        expenses.push(newExpense);
        return [{ insertId: newExpense.expense_id, affectedRows: 1 }];
      }

      if (trimmed.includes("FROM Expenses AS e") && trimmed.includes("WHERE e.userId =")) {
        const uId = Number(params[0]);
        const match = expenses
          .filter(e => e.userId === uId)
          .sort((a, b) => b.created_at - a.created_at)
          .map(e => {
            const cat = categories.find(c => c.id === e.category_id);
            return {
              expenseId: e.expense_id,
              categoryName: cat ? cat.name : "General",
              amount: e.amount,
              description: e.description,
              created_at: e.created_at.toISOString()
            };
          });
        return [match];
      }

      if (trimmed.startsWith("DELETE FROM Expenses")) {
        const [expId, uId] = params;
        const idx = expenses.findIndex(e => e.expense_id === Number(expId) && e.userId === Number(uId));
        if (idx !== -1) expenses.splice(idx, 1);
        return [{ affectedRows: 1 }];
      }

      if (trimmed.startsWith("UPDATE Expenses SET")) {
        const [val, expId, uId] = params;
        const target = expenses.find(e => e.expense_id === Number(expId) && e.userId === Number(uId));
        if (target) {
          if (trimmed.includes("SET amount =")) target.amount = Number(val);
          if (trimmed.includes("SET description =")) target.description = String(val);
          if (trimmed.includes("SET category_id =")) target.category_id = Number(val);
        }
        return [{ affectedRows: target ? 1 : 0 }];
      }

      if (trimmed.includes("COALESCE(SUM(amount)")) {
        const uId = Number(params[0]);
        const userExpenses = expenses.filter(e => e.userId === uId);
        if (userExpenses.length === 0) {
          return [[{ startDate: null, endDate: null, totalExpense: 0 }]];
        }
        const total = userExpenses.reduce((sum, e) => sum + e.amount, 0);
        const minDate = new Date(Math.min(...userExpenses.map(e => e.created_at.getTime()))).toISOString();
        const maxDate = new Date(Math.max(...userExpenses.map(e => e.created_at.getTime()))).toISOString();
        return [[{ startDate: minDate, endDate: maxDate, totalExpense: total }]];
      }

      if (trimmed.includes("FROM Expenses WHERE amount <=")) {
        const [maxAmt, uId] = params;
        const match = expenses
          .filter(e => e.userId === Number(uId) && e.amount <= Number(maxAmt))
          .sort((a, b) => b.amount - a.amount)
          .map(e => ({
            amount: e.amount,
            description: e.description,
            created_at: e.created_at.toISOString()
          }));
        return [match];
      }

      if (trimmed.startsWith("INSERT INTO userProfile")) {
        const [uId, salary, minimum_expense, expense_goal] = params;
        userProfiles.push({ userId: uId, salary, minimum_expense, expense_goal });
        return [{ affectedRows: 1 }];
      }

      return [[]];
    }
  };
} else {
  const poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    enableKeepAlive: true,
    waitForConnections: true,
    connectTimeout: 10000,
    connectionLimit: 10,
    queueLimit: 0,
  };

  if (fs.existsSync(caPath)) {
    poolConfig.ssl = { ca: fs.readFileSync(caPath) };
  }

  const databaseServer = mysql.createPool(poolConfig);
  dbExport = databaseServer.promise();
}

export default dbExport;
