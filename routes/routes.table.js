import addExpense from '../controllers/user.addexpense.js';
import getExpense from '../controllers/user.getexpense.js';
import filterExpenseByAmount from '../controllers/expense.filterbyamount.js';
import signIn from '../controllers/user.login.js';
import register from '../controllers/user.signin.js';

const routesObj = {
    'GET' : {
        'getExpense' : getExpense,
        'filterExpense' : filterExpenseByAmount,
    },
    'POST' : {
        'addExpense' : addExpense,
        'signIn' : signIn,
        'register' : register,  
    },
    'HEAD' : {
   
    },
    'PATCH' : {

    },
    'DELETE' : {

    },
    'OPTIONS' : {

    },
}

export default routesObj;
