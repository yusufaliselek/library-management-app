import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import partsRoutes from './routes/parts.js';
import shelvesRoutes from './routes/shelves.js';

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

app.use("/parts", partsRoutes);
app.use("/shelves", shelvesRoutes);


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