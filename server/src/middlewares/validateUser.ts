//not in use for now

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

// Define validation rules as an array of ValidationChain
const userValidationRules: ValidationChain[] = [
  body('username')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),

  body('email')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character'),
];

// Middleware to handle validation result errors
const handleValidationErrors: RequestHandler = (req, res, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
      return; 
  }
  next();
};

export { userValidationRules, handleValidationErrors };
