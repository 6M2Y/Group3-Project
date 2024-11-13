import express from 'express';
import * as postController from '../controllers/postcontrollers';
import { uploadSingleImage } from '../middlewares/uploadImage';
import { verifyToken } from '../middlewares/verifyToken';


const postrouter = express.Router();

postrouter.post('/publish',verifyToken, uploadSingleImage, postController.publishPost);
postrouter.post('/save-draft', verifyToken, uploadSingleImage, postController.saveDraftPost);
postrouter.put('/edit/:id', postController.editPost);

export default postrouter;
