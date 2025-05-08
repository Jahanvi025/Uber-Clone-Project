import express, { Router } from "express";
import { googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/google', googleLogin);

export default router;
