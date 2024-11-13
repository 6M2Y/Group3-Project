import multer from 'multer';
import path from 'path';

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Using path.join for platform compatibility
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Export configured multer instance
export const upload = multer({ storage });
