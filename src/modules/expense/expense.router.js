import express from 'express';
const router = express.Router();
import authenticate from '../../utils/authenticator.js';
import controller from './expense.controller.js';

router.post('/addExpense' , authenticate , controller.addExpense);
router.get('/getExpense', authenticate , controller.getExpense);
router.
