import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());  
dotenv.config();

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.send("Hello World");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

export {app};