import { Router } from 'express';
import {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller.js';

const router = Router();

router.post('/create', createStudent);
router.get('/:idNumber', getStudent);
router.get('/', getAllStudents);
router.put('/:idNumber', updateStudent);
router.delete('/:idNumber', deleteStudent);

export default router;
