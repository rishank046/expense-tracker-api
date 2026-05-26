import express from 'express';
import * as expenseOperations from '../services/expenseOperations.service.js';
import wrapper from '../utils/catchWrapper.js';
import verifyUser from '../utils/verifyUser.js';

const router = express.Router();

router.use(wrapper(verifyUser));

router.post('/addExpense' , wrapper(expenseOperations.createExpense));
router.get('/getExpense' , wrapper(expenseOperations.getExpense));
router.post('/deleteExpense' , wrapper(expenseOperations.deleteExpense));
router.put('/updateExpense' , wrapper(expenseOperations.updateExpense));
router.get('/getSummary' , wrapper(expenseOperations.getSummary));

export default router;