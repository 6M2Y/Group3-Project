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
export const getAllPosts = (req: Request, res: Response) => postService.getAllPosts(req as AuthenticatedRequest, res);
export const getUserPosts = (req: Request, res: Response) => postService.getUserPosts(req as AuthenticatedRequest, res);
export const get_LatestPosts = (req: Request, res: Response) => postService.getLatestPosts(req, res);
export const countUserPosts = (req: Request, res: Response) => postService.countUserPosts(req as AuthenticatedRequest, res);
export const searchby_Tag = (req: Request, res: Response) => postService.searchPostsByTag(req, res)
export const getTag_Counts = (req:Request, res:Response) => postService.getTagCounts(req,res)
export const addComment = (req: Request, res: Response) => postService.addComment(req as AuthenticatedRequest, res);

export const incrementViews = (req: Request, res: Response) => postService.incrementViews(req as AuthenticatedRequest, res);
export const saveNewVersion = (req: Request, res: Response) => postService.saveNewVersion(req as AuthenticatedRequest, res);
export const getPageStatistics = (req: Request, res: Response) => postService.getPageStatistics(req as AuthenticatedRequest, res);
export const deletePost = (req: Request, res: Response) => postService.deletePost(req as AuthenticatedRequest, res);

export const viewCount = (req: Request, res: Response) => postService.getViews(req, res);
export const getCommentsFromPost = (req: Request, res: Response) => postService.getComments(req, res);

export const deleteCommentController = (req:Request, res:Response) => postService.deleteComment(req,res);
export const saveEditedCommentController = (req: Request, res: Response) => postService.savedEditComment(req as AuthenticatedRequest, res);
