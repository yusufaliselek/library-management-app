import PartImage from "../models/partImages.js";
import Token from "../models/tokens.js";

export const getPartImageById = async (req, res) => {
    try {
        const token = await Token.find({ token: req.headers.authorization });
        if (!token[0]) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const partImage = await PartImage.find({ partId: req.params.id });
        if (!partImage[0]) {
            partImage[0] = new PartImage({
                partId: req.params.id,
                image: ''
            });
        }
        res.status(200).json(partImage[0].image);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}