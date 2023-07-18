import { Router } from 'express';
import {
  createuser,
  loginuser,
  getuser,
  getAllusers,
  updateuser,
  deleteuser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/create', createuser);
router.post('/login', loginuser);
router.get('/:idNumber', getuser);
router.get('/', getAllusers);
router.put('/:idNumber', updateuser);
router.delete('/:idNumber', deleteuser);

export default router;
