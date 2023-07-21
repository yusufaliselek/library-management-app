import mongoose from "mongoose";

const partSchema = mongoose.Schema({
    name: String,
    description: String,
    code: String,
    price: String,
    quantity: String,
    image: String,
    shelfId: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Part = mongoose.model("Part", partSchema);

export default Part;