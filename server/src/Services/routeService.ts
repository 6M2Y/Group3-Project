import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import User from '../models/User Schema';


// interface SignUpBody {
//     fullname: string,
//     email: string,
//   password: string,
//   username: string
// }

// Sample front page route
export const frontPage = (req: Request, res: Response) => {
  res.send('API is running');
};


export const signupLogic = (req: Request, res: Response): void => {
  const { fullname, email, password } = req.body;

  try {
    if (fullname.length < 3) {
      res.status(403).json({ "error": "Full name must be at least 3 characters" });
      return;
    }

    // Validate email
    if (!email || !email.length) {
      res.status(403).json({ "error": "Enter email" }); return;
    }

    const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegEx.test(email)) {
      res.status(403).json({ "error": "Invalid email" }); return;
    }

    // Validate password
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegEx.test(password)) {
      res.status(403).json({ "error": "Invalid password: should contain at least 1 letter, 1 digit, and have a minimum length of 4 characters" });
      return;
    }
    //create username from useremail
    let username = email.split('@')[0];//splits the email at '@', index 0 becomes username
    let user = new User({
      fullname,
      password,
      email,
      username
    })
//creating the user in db
    user.save().then((newUser) => {
      return res.status(200).json({user: newUser})
    })
      .catch(err => {
      return res.status(500).json({"Error" : err.message})
    })

    // Here you would handle the registration logic, e.g., save to database
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    return;
  }
};
