import { validationResult } from 'express-validator';
import AdminModel from '../models/admin.model.js';
import { BlacklistToken } from '../models/blacklistToken.model.js';
import { createAdmin } from '../services/admin.service.js';

export const registerAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {
        const existing = await AdminModel.findOne({ email });
        if (existing) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await AdminModel.hashPassword(password);

        const admin = await createAdmin({ username, email, password: hashedPassword });
        const token = admin.generateAuthToken();

        res.status(201).json({ token, admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ email }).select('+password');
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = admin.generateAuthToken();
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        admin.password = undefined;

        res.status(200).json({ token, admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAdminProfile = (req, res) => {
    res.status(200).json({ admin: req.admin });
};

export const logoutAdmin = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        await BlacklistToken.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
