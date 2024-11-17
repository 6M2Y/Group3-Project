import express from 'express';
import * as postController from '../controllers/postcontrollers';
import { uploadSingleImage } from '../middlewares/uploadImage';
import { verifyToken } from '../middlewares/verifyToken';
//import { authenticate } from '../Utils/authenticate';
 


const postrouter = express.Router();

postrouter.post('/publish',verifyToken, uploadSingleImage, postController.publishPost);
postrouter.post('/save-draft', verifyToken, uploadSingleImage, postController.saveDraftPost);
postrouter.put('/edit/:id', postController.editPost);
postrouter.get('/posts', postController.getAllPosts);
postrouter.get('/user/posts', verifyToken, postController.getUserPosts);
postrouter.get('/user/posts/count', verifyToken, postController.countUserPosts);
postrouter.post('/comment', verifyToken, postController.addComment);
postrouter.get('/latest-posts', postController.get_LatestPosts);
postrouter.get('/pages/:id', postController.incrementViews);
postrouter.post('/pages/:id/edit', postController.saveNewVersion);
postrouter.get('/pages/:id/statistics', postController.getPageStatistics);
postrouter.delete('/delete/:id', verifyToken, postController.deletePost);
postrouter.put('/posts/:id/version', postController.saveNewVersion);


export default postrouter;
