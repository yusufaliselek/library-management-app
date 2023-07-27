import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;