import { Request, Response } from 'express';
import * as postService from '../Services/postServices';

export const saveDraftPost = (req: Request, res: Response) => postService.saveDraftPost(req, res);
export const publishPost = (req: Request, res: Response) => postService.publishPost(req, res);
export const editPost = (req: Request, res: Response) => postService.editPost(req, res);
