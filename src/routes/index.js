import { Router } from 'express';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import homeRouter from './home.router.js';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

export default router;
