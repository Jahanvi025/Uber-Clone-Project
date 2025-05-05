import express from 'express';
import { registerCaptain } from '../controllers/captain.controller.js';
const router = express.Router();
import { body } from 'express-validator';

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of the following: car, motorcycle, auto'),
], registerCaptain);



export default router;