import express from 'express';
const app = express()
import { connect } from 'mongoose';
import router from './router/index.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

connect(MONGO_URL);
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})