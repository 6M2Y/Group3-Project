import { upload } from '../configs/multerConfig';

export const uploadSingleImage = upload.single('image');
