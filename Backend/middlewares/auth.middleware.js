import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import AdminModel from '../models/admin.model.js';
import {BlacklistToken} from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authUser = async (req, res, next) => {
    try {
        
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers?.authorization;
        const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const token = cookieToken || headerToken;
        

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });

        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.id).select("-password -__v");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export const authCaptain = async (req, res, next) => {
    try {
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers?.authorization;
        const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if( isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const captain = await captainModel.findById(decoded.id).select("-password -__v");

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        req.captain = captain;
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


export const authAdmin = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token has been revoked. Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.role !== 'admin') return res.status(403).json({ message: "Forbidden" });

        const admin = await AdminModel.findById(decoded.id);
        if (!admin) return res.status(401).json({ message: "Admin not found" });

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
