import express from 'express';
import authRoutes from './authroutes';
import postRoutes from './postroutes';

const router = express.Router();

router.use(authRoutes);  // Authentication routes
router.use(postRoutes);  // Post-related routes

export default router;
