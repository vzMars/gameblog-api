import express from 'express';
import {
  authStatus,
  login,
  logout,
  signup,
} from '../controllers/authController';
const router = express.Router();
import ensureAuth from '../middleware/auth';

router.get('/', ensureAuth, authStatus);
router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signup);

export default router;
