import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';
import createHttpError, { isHttpError } from "http-errors";
// import { validateUser } from './middlewares/validateUser';
import { addAbortListener } from 'events';
import wikiRouter from './router/wikiRouter';

dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', wikiRouter)
// Defining routes


// export const signUp: RequestHandler <unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
// app.post("/signup", signupLogic, (req: Request, res: Response) => {
//   // This will be called if validation in signupLogic passes
//   res.status(200).json({ "message": "Signup successful" });
// });

// app.post("/signup", signupLogic);

// Error Handling Middleware
// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//     console.error(error);
//     let errorMessage = "An unknown error occurred";
//     let statusCode = 500;
//     if (isHttpError(error)) {
//         statusCode = error.status;
//         errorMessage = error.message;
//     }
//     res.status(statusCode).json({ error: errorMessage });
// });
export default app;