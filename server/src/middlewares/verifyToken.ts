// src/middleware/verifyToken.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: string; // This will hold the authenticated user ID after verification
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) : void => {
  const authHeader = req.headers.authorization;
  //console.log('Authorization Header:', authHeader); // Log the authorization header

  // Check if there is an Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided, authorization denied' });
      return
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  //console.log('Token:', token); // Log the token


  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };

    // Attach the decoded user ID to req.user
    req.user = decoded.id;
    
    // Move to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
