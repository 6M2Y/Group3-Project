import express from 'express';
import * as authController from '../controllers/authcontrollers';
//import { getProfile } from '../controllers/profileController';
import { authenticate } from '../Utils/authenticate';
const userrouter = express.Router();

userrouter.get('/', authController.frontPage);
userrouter.post('/signin', authController.signin);
userrouter.post('/signup', authController.signup);
userrouter.post('/google-auth', authController.signinWithGoogle);
userrouter.get('/profile',authenticate, authController.getProfile);


export default userrouter;
