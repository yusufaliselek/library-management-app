import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import partsRoutes from './routes/parts.js';
import shelvesRoutes from './routes/shelves.js';
import partImagesRoutes from './routes/partImages.js';
import homeRoutes from './routes/home.js';
import usersRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        author: "Yusuf Ali Selek",
        message: "Hello World!"
    });
});

app.use("/home", homeRoutes);
app.use("/parts", partsRoutes);
app.use("/shelves", shelvesRoutes);
app.use("/partImages", partImagesRoutes);
app.use("/login", usersRoutes)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})