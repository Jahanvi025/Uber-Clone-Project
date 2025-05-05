import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/admin.controller.js';
import { body } from 'express-validator';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username too short'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters')
], registerAdmin);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').exists().withMessage('Password is required')
], loginAdmin);

router.get('/profile', authAdmin, getAdminProfile);
router.get('/logout', authAdmin, logoutAdmin);

export default router;
