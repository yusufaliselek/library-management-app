import User from "../models/users.js";
import Token from "../models/tokens.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username, password: req.body.password });
        if (!user[0]) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const token = await Token.find();
        if (!token[0]) return res.status(404).send('No token found.');
        res.status(200).json(token[0].token);
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}
