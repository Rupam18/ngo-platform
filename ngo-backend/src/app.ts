import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { prisma } from './config/prisma';
import authRoutes from './routes/auth.routes';
import donationRoutes from './routes/donation.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { protect } from './middleware/auth.middleware';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/protected', protect, (req: Request, res: Response) => {
    res.json({ message: 'You are authenticated' });
});

// Basic Health Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'NGO Platform API is running.' });
});

// DB Test Route
app.get('/test-db', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

export default app;
