// import { upload } from '../configs/multerConfig';

// export const uploadSingleImage = upload.single('image');
// src/middlewares/uploadImage.ts
import { Request, Response, NextFunction } from 'express';
import { upload } from '../configs/multerConfig';

// Wrapper to handle file upload with error handling
export const uploadSingleImage = (req: Request, res: Response, next: NextFunction) :void => {
  upload.single('image')(req, res, (err: unknown) => {
    if (err) {
      next(err); // Pass the error to the next middleware (error handler)
    }
    next(); // If no errors, pass control to the next middleware
  });
};
