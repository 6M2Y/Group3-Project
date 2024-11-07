import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';
import { frontPage, signupLogic } from './Services/routes'; // Import routes from routes.ts
import createHttpError, { isHttpError } from "http-errors";

dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Defining routes
app.get('/', frontPage);  // Front page route

export const signUp: RequestHandler <unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
app.post("/signup", signupLogic, (req: Request, res: Response) => {
  // This will be called if validation in signupLogic passes
  res.status(200).json({ "message": "Signup successful" });
});

// Error Handling Middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
export default app;