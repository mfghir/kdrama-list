import mongoose from "mongoose"

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetAt: {
        type: Date
    }
})

const ForgotPasswordToken = mongoose.models.ForgotPasswordToken || mongoose.model("ForgotPasswordToken", TokenSchema)

export default ForgotPasswordToken