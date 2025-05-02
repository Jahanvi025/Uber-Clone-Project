import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h', // Token will expire after 24 hour
    },
});


export const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);