import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
 
   try {
     const { fullname, email, password } = req.body;
     const isUserAlreadyExist = await userModel.findOne({ email });
      
     if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
      }

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
  res.cookie("token", token);

  res.status(200).json({token, user});
};

export const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistToken.create({ token });
  res.status(200).json({message: "Logged out successfully"});
}