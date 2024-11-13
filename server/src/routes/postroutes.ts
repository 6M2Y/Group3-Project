import express from 'express';
import * as postController from '../controllers/postcontrollers';
import { uploadSingleImage } from '../middlewares/uploadImage';

const postrouter = express.Router();

postrouter.post('/publish', uploadSingleImage, postController.publishPost);
postrouter.post('/save-draft', uploadSingleImage, postController.saveDraftPost);
postrouter.put('/edit/:id', postController.editPost);

export default postrouter;
