import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength: [3, 'First name must be atleast 3 characters long'],
        },
        lastname:{
            type:String,
            minlength: [3, 'Last name must be atleast 3 characters long'],
            },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength: [5, 'Email must be atleast 5 characters long'],
    },
    password:{
        type:String,
        select: false,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function () {
    if (!this._id) {
        throw new Error("generateAuthToken: User ID is missing");
      }
    
    const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {expiresIn: '24h'});
    return token;
  };
  

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

const userModel = mongoose.model('user', userSchema);

export default userModel;