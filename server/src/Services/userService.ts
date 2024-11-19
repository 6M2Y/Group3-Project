import { Request, Response } from 'express';
import User from '../models/UserSchema';
import Page from '../models/PageSchema';
import Comment from '../models/CommentSchema';
import Tag from '../models/Tag Schema';
import { generateUserName } from '../Utils/generateUserName';
import { validateSignupInput } from '../Utils/validateUser';
import bcrypt from 'bcrypt'
import { FormatDatatoSend } from '../Utils/FormatDatatoSend';
import admin from 'firebase-admin'; //connect to frontend firebase
import {getAuth} from 'firebase-admin/auth'
import * as dotenv from "dotenv";


interface ProfileData {
  user: any; // Replace 'any' with the appropriate type
  pages: any[]; // Replace 'any' with the appropriate type
  comments: any[]; // Replace 'any' with the appropriate type
  tags: string[];
}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const signinWithGoogle = async (req: Request, res: Response): Promise<void> => {
  const { access_token } = req.body;

  try {
    // Verify the ID token from the Google authentication
    const processedData = await getAuth().verifyIdToken(access_token);
    const { email, name } = processedData;

    // Search for the user in the database by email
    let user = await User.findOne({ email }).select("fullname username google_auth");

    if (user) {
      // If the user is found but is not authenticated via Google, return an error
      if (!user.google_auth) {
        res.status(403).json({ error: "Please log in with password to access the account." });
        return;
      }
    } else {
      // If the user doesn’t exist, create a new one
      const username = await generateUserName(email as string);

      user = new User({
        fullname: name,
        email,
        username,
        google_auth: true,
      });

      // Save the new user to the database
      try {
        user = await user.save();
      } catch (error) {
        console.error("Error saving the new user:", error);
        res.status(500).json({ error: "Database error while trying to authenticate" });
        return;
      }
    }

    // Send the formatted user data as a response
    res.status(200).json(FormatDatatoSend(user));
  } catch (err) {
    // Error handling for token verification or other unexpected issues
    console.error("Error during Google authentication:", err);
    res.status(500).json({ error: "Failed to authenticate using Google" });
  }
};

export const getProfileData = async (userId: string): Promise<ProfileData | null> => {
  const user = await User.findById(userId);
  if (!user) {
    return null; // Handle the case where the user is not found
  }
  const pages = await Page.find({ author: user._id });
  const comments = await Comment.find({ author: user._id });
  const tags = await Tag.find({ pages: { $in: pages.map(page => page._id) } }).distinct('name');

  return { user, pages, comments, tags };
};

// Fetch user by ID
export const fetchUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send('User not found');
      return
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error fetching user' + error);
  }
};

// Legg til denne linjen på slutten av userService.ts



// export const signinWithGoogle = async (req: Request, res: Response) => {
//   const { access_token } = req.body;

  // try {
  //   // Verify the ID token from the Google authentication
  //   const googleUser = await getAuth().verifyIdToken(access_token);
  //   const { email, name } = googleUser;

  //   console.log("Verified Google User:", googleUser); // Logging for debugging purposes

  //   // Check if the user already exists in the database
  //   let user = await User.findOne({ email }).select("fullname username google_auth").exec();

  //   if (user) {
  //     // If the user is found but not authenticated via Google, return an error
  //     if (!user.google_auth) {
  //       res.status(403).json({ error: "Please log in with password to access the account." });
  //       return;
  //     }
  //   } else {
  //     // If the user doesn't exist, create a new one
  //     const username = await generateUserName(email as string);
      
  //     user = new User({
  //       fullname: name,
  //       email,
  //       username,
  //       google_auth: true,
  //     });

  //     // Save the new user to the database
  //     try {
  //       user = await user.save(); // Directly using await for cleaner code
  //     } catch (err) {
  //       console.error("Error saving the new user:", err); // Detailed error logging
  //       res.status(500).json({ error: "Database error while trying to authenticate" });
  //       return;
  //     }
  //   }

  //   // Send the formatted user data as response
  //   res.status(200).json(FormatDatatoSend(user)); // Ensure FormatDatatoSend() is properly formatting the user data
  // } catch (err) {
  //   // Error handling for token verification or other unexpected issues
  //   console.error("Error during Google authentication:", err);
  //   res.status(500).json({ error: "Failed to authenticate using Google" });
  // }

  // getAuth().verifyIdToken(access_token)
  //   .then((async (processedData) => {
  //     let { email, name } = processedData;
  //     //found me fullname username google_auth from User db, returns the a document or null
  //     let user = await User.findOne({ email }).select("fullname username google_auth").then((doc) => {
  //       return doc || null; //
  //     }).catch(err => {
  //       return res.status(500).json({ "Error: ": err.message });
  //     });

  //     if (user) { //login
  //       // If the user is found but not authenticated via Google, return an error
  //       if (!user.google_auth) {
  //         res.status(403).json({ error: "Please log in with password to access the account." });
  //         return;
  //       }
  //     } else if (!user) {
  //       // If the user doesn't exist, create a new one
  //       const username = await generateUserName(email as string);
      
  //       user = new User({
  //         fullname: name,
  //         email,
  //         username,
  //         google_auth: true,
  //       });
  //       //after creating the user
  //       await user.save().then((datafromDB) => {
  //         user = datafromDB;
  //       }).catch(err => {
  //         console.error("Error saving the new user:", err);
  //       });

  //     }
  //     return res.status(200).json(FormatDatatoSend(user));
    
  //   }).catch(err => {
  //     // Error handling for token verification or other unexpected issues
  //     console.error("Error during Google authentication:", err);
  //     res.status(500).json({ error: "Failed to authenticate using Google" });
  //   })
// };
  
// try {
//   // Verify the ID token from the Google authentication
//   const processedData = await getAuth().verifyIdToken(access_token);
//   const { email, name } = processedData;

//   // Search for the user in the database by email
//   let user = await User.findOne({ email }).select("fullname username google_auth");

//   if (user) {
//     // If the user is found but is not authenticated via Google, return an error
//     if (!user.google_auth) {
//       return res.status(403).json({ error: "Please log in with password to access the account." });
//     }
//   } else {
//     // If the user doesn’t exist, create a new one
//     const username = await generateUserName(email as string);

//     user = new User({
//       fullname: name,
//       email,
//       username,
//       google_auth: true,
//     });
//     console.log("user: " + user)
//     // Save the new user to the database
//     try {
//       user = await user.save();
//     } catch (error) {
//       console.error("Error saving the new user:", error);
//       return res.status(500).json({ error: "Database error while trying to authenticate" });
//     }
//   }

//   // Send the formatted user data as a response
//   return res.status(200).json(FormatDatatoSend(user));
// } catch (err) {
//   // Error handling for token verification or other unexpected issues
//   console.error("Error during Google authentication:", err);
//   return res.status(500).json({ error: "Failed to authenticate using Google" });
// }
// };