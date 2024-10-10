// Initiate the server

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
connectDB();

import adminRoutes from './routes/adminRoutes.js';

const port = process.env.port || 5000;

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => res.send('API running'));

app.listen(port, () => console.log(`Server started on port ${port}`));
