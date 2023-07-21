import mongoose from "mongoose";

const shelfSchema = mongoose.Schema({
    name: String,
    description: String,
    code: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Shelf = mongoose.model("Shelf", shelfSchema);

export default Shelf;