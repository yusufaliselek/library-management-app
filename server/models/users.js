import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model("User", userSchema);

export default User;