// app.ts
import express from 'express';
import branchRoutes from './api/v1/routes/branchRoutes';
import employeeRoutes from './api/v1/routes/employeeRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Health check
app.get('/health', (_, res) => res.status(200).send('Server is healthy'));

export default app;
