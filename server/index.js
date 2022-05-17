import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//Route Imports
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

const DB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5500;

const main = async () => {
    try {
        await mongoose.connect(DB_URL);
    } catch (e) {
        console.log(e.message);
    }
};
main();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}.`);
});
