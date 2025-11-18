import express from 'express';
import dotenv from 'dotenv';
import { getHelmetConfig } from "../config/helmetConfig";
import branchRoutes from './api/v1/routes/branchRoutes';
import employeeRoutes from './api/v1/routes/employeeRoutes';

// Load environment variables first
dotenv.config();

// Apply custom Helmet configuration
app.use(getHelmetConfig());

const app = express();
app.use(express.json());

// Routes
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Health check
app.get('/health', (_, res) => res.status(200).send('Server is healthy'));

export default app;
