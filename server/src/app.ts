import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/mainroute';  // Combined routes
import './configs/multerConfig'; // Ensure multer uploads directory exists


dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/uploads', express.static('uploads')); // Serve static images
app.use('/', routes); // Apply combined routes

export default app;
