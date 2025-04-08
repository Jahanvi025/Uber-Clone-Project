import express from "express";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config();

app.use(cors());


app.get("/",(req, res)=>{
    res.send("Hello World");
});

export {app};