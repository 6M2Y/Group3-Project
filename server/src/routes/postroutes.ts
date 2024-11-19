import express from 'express';
import * as postController from '../controllers/postcontrollers';
import { uploadSingleImage } from '../middlewares/uploadImage';
import { verifyToken } from '../middlewares/verifyToken';
//import { authenticate } from '../Utils/authenticate';
 


const postrouter = express.Router();

// Grouping routes with common prefixes
postrouter.post('/publish', verifyToken, uploadSingleImage, postController.publishPost);
postrouter.post('/save-draft', verifyToken, uploadSingleImage, postController.saveDraftPost);
postrouter.get('/latest-posts', postController.get_LatestPosts);
postrouter.get('/tags/counts', postController.getTag_Counts);

// User-specific routes
postrouter.use('/user', verifyToken);
postrouter.get('/user/posts', postController.getUserPosts);
postrouter.get('/user/posts/count', postController.countUserPosts);

// Comment-related routes
postrouter.post('/comment', verifyToken, postController.addComment);
postrouter.get('/posts/:postId/comments', postController.getCommentsFromPost);
postrouter.put('/comment/:commentId', verifyToken, postController.saveEditedCommentController);
postrouter.delete('/comment/:commentId', postController.deleteCommentController);

// Post management routes
postrouter.get('/posts', postController.getAllPosts);
postrouter.put('/edit/:id', postController.editPost);
postrouter.delete('/delete/:id', verifyToken, postController.deletePost);
postrouter.put('/posts/:id/version', postController.saveNewVersion);

// Page-specific routes
postrouter.get('/pages/:id', postController.incrementViews);
postrouter.post('/pages/:id/edit', postController.saveNewVersion);
postrouter.get('/pages/:id/statistics', postController.getPageStatistics);
postrouter.put('/pages/:id/views', postController.viewCount);

// Search and tagging routes
postrouter.post('/searchbytag', postController.searchby_Tag);


export default postrouter;
