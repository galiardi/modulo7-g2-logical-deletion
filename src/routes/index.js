import { Router } from 'express';
import studentRouter from './student.router.js';

const router = Router();

router.use('/student', studentRouter);

export default router;
