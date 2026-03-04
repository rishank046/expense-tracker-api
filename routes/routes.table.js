import addExpense from '../controllers/addExpense.js';
import getExpense from '../controllers/getExpense.js';
import filterExpenseByAmount from '../controllers/filterExpenseByamount.js';
import signIn from '../controllers/logInUser.js';
import register from '../controllers/createUser.js';
import route from './routes.js';

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
