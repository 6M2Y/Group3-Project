import express from 'express';
//import { ensureAuthenticated } from '../Utils/auth'; // Middleware to check if user is authenticated
import { getProfile } from '../controllers/profileController';
import { authenticate } from '../Utils/authenticate';


const router = express.Router();

router.get('/profile',authenticate, getProfile);

export default router;
