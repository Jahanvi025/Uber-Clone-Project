import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
 
   try {
     const { fullname, email, password } = req.body;
 
     const hashedPassword = await userModel.hashPassword(password); // Must be defined in model
 
     const user = await createUser({
       firstname: fullname.firstname,
       lastname: fullname.lastname,
       email,
       password: hashedPassword,
     });
 
     const token = user.generateAuthToken(); 
 
     res.status(201).json({ token, user });
   } catch (error) {
     console.error("Registration Error:", error.message);
     res.status(500).json({ error: error.message });
   }
 };
 

export const loginUser = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if(!user) return res.status(401).json({message: "Invalid email or password"});

  const isMatch = await user.comparePassword(password);
  
  if(!isMatch) {
    return res.status(401).json({message: "Invalid email or password"});
  }

  const token = user.generateAuthToken();

  res.status(200).json({token, user});
};