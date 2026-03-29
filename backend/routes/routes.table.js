import addExpense from "../controllers/user.addexpense.js";
import getExpense from "../controllers/user.getexpense.js";
import filterExpenseByAmount from "../controllers/expense.filterbyamount.js";
import logIn from "../controllers/user.login.js";
import register from "../controllers/user.signin.js";
import deleteExpense from "../controllers/expense.delete.js";

const routesObj = {
  GET: {
    "/getExpense": getExpense,
    "/filterExpense": filterExpenseByAmount,
  },
  POST: {
    "/addExpense": addExpense,
    "/logIn": logIn,
    "/register": register,
    "/deleteExpense": deleteExpense,
  },
  HEAD: {},
  PATCH: {},
  DELETE: {},
  OPTIONS: {},
};

export default routesObj;
