import express from 'express';
import * as userControllers from '../services/userOperations.service.js';
import wrapper from '../utils/catchWrapper.js';

const router = express.Router();

router.post('/login' , wrapper(userControllers.userLogIn));
router.post('/signin' , wrapper(userControllers.userSignIn));
router.post('/profile' , wrapper(userControllers.setupProfile));

export default router;