import express from 'express';
import { getUser } from '../controllers/userController';
import ensureAuth from '../middleware/auth';
const router = express.Router();

router.get('/:username', ensureAuth, getUser);

export default router;
