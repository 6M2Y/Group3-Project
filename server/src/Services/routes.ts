import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';


interface SignUpBody {
    fullname: string,
    email: string,
    password: string,
}

// Sample front page route
export const frontPage = (req: Request, res: Response) => {
  res.send('API is running');
};

// Signup logic as a middleware to validate request
export const signupLogic: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  // Validate fullname
  if (fullname.length < 3) {
    return res.status(403).json({ "error": "Full name must be at least 3 characters" });
  }

  // Validate email
  if (!email || !email.length) {
    return res.status(403).json({ "error": "Enter email" });
  }

  const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegEx.test(email)) {
    return res.status(403).json({ "error": "Invalid email" });
  }

  // Validate password
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  if (!passwordRegEx.test(password)) {
    return res.status(403).json({ "error": "Invalid password: should contain at least 1 letter, 1 digit, and have a minimum length of 4 characters" });
  }

  // If everything is okay, proceed to next middleware or route
  next();
};
