import express from 'express';
import * as authController from '../controllers/authcontrollers';

const userrouter = express.Router();

userrouter.get('/', authController.frontPage);
userrouter.post('/signin', authController.signin);
userrouter.post('/signup', authController.signup);
userrouter.post('/google-auth', authController.signinWithGoogle);

export default userrouter;
