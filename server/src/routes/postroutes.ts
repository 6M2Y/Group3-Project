import express from 'express';
import * as postController from '../controllers/postcontrollers';
import { uploadSingleImage } from '../middlewares/uploadImage';
import { verifyToken } from '../middlewares/verifyToken';
//import { authenticate } from '../Utils/authenticate';
 


const postrouter = express.Router();

postrouter.post('/publish',verifyToken, uploadSingleImage, postController.publishPost);
postrouter.post('/save-draft', verifyToken, uploadSingleImage, postController.saveDraftPost);
postrouter.post('/searchby-tag', postController.searchby_Tag);
postrouter.put('/edit/:id', postController.editPost);
postrouter.get('/posts', postController.getAllPosts);
postrouter.get('/user/posts', verifyToken, postController.getUserPosts);
postrouter.get('/user/posts/count', verifyToken, postController.countUserPosts);
<<<<<<< HEAD
postrouter.post('/comment', verifyToken, postController.addComment);
=======
postrouter.get('/latest-posts', postController.get_LatestPosts);
postrouter.get('/tags/counts', postController.getTag_Counts);


export default postrouter;
