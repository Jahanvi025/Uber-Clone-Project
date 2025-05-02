import userModel from "../models/user.model.js";
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

        const isBlacklisted = await userModel.findOne({ token: token });

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
