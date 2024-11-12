import { Request, Response, NextFunction } from 'express';
import User from '../models/User Schema';
import { generateUserName } from '../Utils/generateUserName';
import { validateSignupInput } from '../Utils/validateUser';
import bcrypt from 'bcrypt'
import { FormatDatatoSend } from '../Utils/FormatDatatoSend';
import admin from 'firebase-admin'; //connect to frontend firebase
import {getAuth} from 'firebase-admin/auth'
import * as dotenv from "dotenv";

dotenv.config();

//firebase admin
admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS || ""),
})

// Sample front page route
export const frontPage = (req: Request, res: Response) => {
  res.send('API is running');
};

export const signupLogic = async (req: Request, res: Response): Promise<void> => {
  const { fullname, email, password } = req.body;

  // Validate input data
  const validationError = validateSignupInput(fullname, email, password);
  if (validationError) {
    res.status(403).json({ error: validationError });
    return;
  }

  try {
    // Generate a unique username based on the email
    const username = await generateUserName(email);

    // Create a new user instance
    const user = new User({ fullname, email, password, username });

    // Save the user to the database
    const newUser = await user.save();
    //data to frontend
    //const accesstoken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY as string);//jwt token
    res.status(201).json(FormatDatatoSend(newUser)); //formats the data we want to send to the client
  } catch (err: any) {
    // Check for duplicate email error
    if (err.code === 11000) {
      res.status(409).json({ error: "Duplicate email. Email already exists in the database." });
    } else {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
};

export const signin = (req: Request, res: Response): void => {
  const {email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user)
    {
       return res.status(403).json({ "Error": "user not found or Invalid email" });
    }
     
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(403).json({"error": "Error while login, try later"})
      }
      if (!result)
      {
        return res.status(403).json({"error": "invalid password"})
      }
      else {
        //if everything is ok
        return res.status(200).json(FormatDatatoSend(user));
      }
    })
  }).catch(err => {
    res.status(500).json({ "Error": err.message });
  })

};

// export const signinWithGoogle = async (req: Request, res: Response): Promise<void> => {
//   const { access_token } = req.body;

//   try {
//     // Verify the ID token from the Google authentication
//     const googleUser = await getAuth().verifyIdToken(access_token);
//     const { email, name, picture } = googleUser;
// console.log(googleUser)
//     // Check if the user already exists in the database
//     let user = await User.findOne({ email }).select("fullname username google_auth").exec();

//     if (user) {
//       // If the user is found but not authenticated via Google, return an error
//       if (!user.google_auth) {
//         res.status(403).json({ error: "Please log in with password to access the account." });
//         return
//       }
//     } else {
//       // If the user doesn't exist, create a new one
//       const username = await generateUserName(email as string);
      
//       user = new User({
//         fullname:name,
//         email,
//         username,
//         google_auth: true,
//       });
//       console.log(user)
//       // Save the new user to the database
//       try {
//         await user.save().then((newUser)=>{user = newUser})
//       } catch (err) {
//         res.status(500).json({ error: "Database error while trying to authenticate" });
//         return
//       }
//       res.status(200).json(FormatDatatoSend(user));
//     }

//     // Send the formatted user data as response
//      res.status(200).json(FormatDatatoSend(user));
//   } catch (err) {
//     // Error handling for token verification or other unexpected issues
//     console.error("Error during Google authentication:", err);
//     res.status(500).json({ error: "Failed to authenticate using Google" });
//     return
//   }
// };

export const signinWithGoogle = async (req: Request, res: Response): Promise<void> => {
  const { access_token } = req.body;

  try {
    // Verify the ID token from the Google authentication
    const googleUser = await getAuth().verifyIdToken(access_token);
    const { email, name, picture } = googleUser;

    console.log("Verified Google User:", googleUser); // Logging for debugging purposes

    // Check if the user already exists in the database
    let user = await User.findOne({ email }).select("fullname username google_auth").exec();

    if (user) {
      // If the user is found but not authenticated via Google, return an error
      if (!user.google_auth) {
        res.status(403).json({ error: "Please log in with password to access the account." });
        return;
      }
    } else {
      // If the user doesn't exist, create a new one
      const username = await generateUserName(email as string);
      
      user = new User({
        fullname: name,
        email,
        username,
        google_auth: true,
      });

      // Save the new user to the database
      try {
        user = await user.save(); // Directly using await for cleaner code
      } catch (err) {
        console.error("Error saving the new user:", err); // Detailed error logging
        res.status(500).json({ error: "Database error while trying to authenticate" });
        return;
      }
    }

    // Send the formatted user data as response
    res.status(200).json(FormatDatatoSend(user)); // Ensure FormatDatatoSend() is properly formatting the user data
  } catch (err) {
    // Error handling for token verification or other unexpected issues
    console.error("Error during Google authentication:", err);
    res.status(500).json({ error: "Failed to authenticate using Google" });
  }
};

// export const signinWithGoogle = (req: Request, res: Response): void => {
//  console.log("FUCK")
//   let { access_token } = req.body;
 
//   //verify access-token generated by the googleauth
//   getAuth().verifyIdToken(access_token).then(async (googleUser) => {
     
//     let { email, name, picture } = googleUser;
   
//     try {
      
//       // Check db with email
//       let user = await User.findOne({ email })
//         .select("fullname username google_auth")
//         .exec(); // Ensure it returns a Promise<Document | null>

//       if (user) {
//         if (!user.google_auth) {
//           // You can now access user.google_auth safely
//           return res.status(403).json({ "error": "Please log in with password to access the account " });
//         }
//       }
//       else {
//         // Handle new user creation
//         let username = await generateUserName(email as string);
//         user = new User({
//           name,
//           email,
//           username,
//           google_auth: true

//         });

//         await user.save().then((newUser) => {
//           user = newUser;
//         }).catch(err => {
//           return res.status(500).json({ "error": "Db problem trying to authonticate"});
       
//         });
//       }
//       return res.status(200).json(FormatDatatoSend(user));
//     }
//     catch (err) {
//       res.status(500).json({ "error": "Internal problem" });
//     }
//   })
//     .catch(err => {
//       return res.status(500).json({ "Error": "Failed to authenticate using googl" })
//   })};