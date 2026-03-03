"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("./middleware/error.middleware");
const rateLimit_middleware_1 = require("./middleware/rateLimit.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, 'http://localhost:3000']
    : ['http://localhost:3000', 'https://yourdomain.com'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(rateLimit_middleware_1.globalLimiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const prisma_1 = require("./config/prisma");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const donation_routes_1 = __importDefault(require("./routes/donation.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const campaign_routes_1 = __importDefault(require("./routes/campaign.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/donation', donation_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/campaign', campaign_routes_1.default);
app.get('/api/protected', auth_middleware_1.protect, (req, res) => {
    res.json({ message: 'You are authenticated' });
});
// Basic Health Route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'NGO Platform API is running.' });
});
// DB Test Route
app.get('/test-db', async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Global Error Handler must be the last middleware
app.use(error_middleware_1.errorHandler);
exports.default = app;
