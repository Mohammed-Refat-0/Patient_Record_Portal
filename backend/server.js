// Initiate the server

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

import connectDB from './config/db.js';
connectDB();

import adminRoutes from './routes/adminRoutes.js';
import hcpRoutes from './routes/hcpRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

const port = process.env.port || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/hcp', hcpRoutes);
app.use('/api/patient', patientRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
