import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, { timestamps: true });

adminSchema.methods.generateAuthToken = function () {
    
    return jwt.sign({ id: this._id, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

adminSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const AdminModel = mongoose.model('Admin', adminSchema);
export default AdminModel;
