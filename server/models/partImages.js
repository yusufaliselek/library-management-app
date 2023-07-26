import mongoose from "mongoose";

const partImageSchema = mongoose.Schema({
    partId: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PartImage = mongoose.model("PartImage", partImageSchema);

export default PartImage;