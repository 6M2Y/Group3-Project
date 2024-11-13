import { Request, Response } from 'express';
import * as authService from '../Services/userService';

export const signup = (req: Request, res: Response) => authService.signupLogic(req, res);
export const signin = (req: Request, res: Response) => authService.signin(req, res);
export const signinWithGoogle = (req: Request, res: Response) => authService.signinWithGoogle(req, res);
export const frontPage = (req: Request, res: Response) => authService.frontPage(req,res);
