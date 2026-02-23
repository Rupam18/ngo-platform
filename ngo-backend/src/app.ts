import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'NGO Platform API is running.' });
});

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

export default app;
