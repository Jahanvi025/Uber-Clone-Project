import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import adminRoutes from './routes/admin.routes.js';
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";

const app = express();
app.use(cookieParser());  
dotenv.config();

db();

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true                 // allow cookies/headers
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.send("Hello World");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRouter);


export {app};