import { Request, Response } from 'express';
import * as postService from '../Services/postServices';

// Define the AuthenticatedRequest interface
interface AuthenticatedRequest extends Request {
    user: string; // or the appropriate type for your user
    file?: Express.Multer.File; // Use the correct type from multer
}  

export const saveDraftPost = (req: Request, res: Response) => postService.saveDraftPost(req as AuthenticatedRequest, res);
export const publishPost = (req: Request, res: Response) => postService.publishPost(req as AuthenticatedRequest, res);
export const editPost = (req: Request, res: Response) => postService.editPost(req as AuthenticatedRequest, res);
