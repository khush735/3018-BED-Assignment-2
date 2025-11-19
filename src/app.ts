import express from 'express';
import dotenv from 'dotenv';
import { getCorsConfig } from "../config/corsConfig";
import { getHelmetConfig } from "../config/helmetConfig";
import branchRoutes from './api/v1/routes/branchRoutes';
import employeeRoutes from './api/v1/routes/employeeRoutes';

// Load environment variables first
dotenv.config();

// Create Express app
const app = express();

// Apply security middleware
app.use(getHelmetConfig());

// Apply CORS configuration
app.use(getCorsConfig());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Health check
app.get('/health', (_, res) => res.status(200).send('Server is healthy'));

export default app;