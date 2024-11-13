// import express from 'express';
// import dotenv from 'dotenv';
// import cors from "cors";
// // import { validateUser } from './middlewares/validateUser';

// import wikiRouter from './router/wikiRouter';

// dotenv.config();  // Load environment variables

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use('/', wikiRouter)
// app.use("/uploads", express.static("uploads")); // Serve the uploads directory
// export default app;

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
// import { validateUser } from './middlewares/validateUser';

//import wikiRouter from './router/wikiRouter';

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
//app.use('/', wikiRouter)
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
