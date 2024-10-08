// Initiate the server

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


import connectDB from './config/db.js';
connectDB();

const port = process.env.port || 5000;

const app = express();

app.get('/', (req, res) => res.send('API running'));

app.listen(port, () => console.log(`Server started on port ${port}`));
