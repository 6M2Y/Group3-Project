// src/utils/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload }  from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Adjust the type based on your user object
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error('SECRET_KEY is not defined');
  }

  try {
    const decoded = jwt.verify(token,secret) as unknown as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { authenticate };