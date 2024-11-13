## Frontend Project Structure



## Backend Project Structure

<pre>
src/
├── app.ts                  # Main app file 
├── config/
│   └── multerConfig.ts      # Multer configuration for file upload
├── controllers/
│   ├── authController.ts    # Authentication controllers (signup, login, Google auth)
│   ├── postController.ts    # Post controllers (save draft, publish, edit post)
├── middlewares/
│   └── uploadImage.ts       # Middleware to handle image upload
├── models/
│   ├── PageSchema.ts        # Page Mongoose schema
│   └── UserSchema.ts        # User Mongoose schema
├── routes/
│   ├── authRoutes.ts        # Routes for authentication
│   ├── postRoutes.ts        # Routes for post operations
│   └── mainRoutes.ts        # Combines all routes into one
├── services/
│   ├── authService.ts       # Handles user-related logic
│   ├── postService.ts       # Handles post-related logic
├── utils/
│   ├── formatData.ts        # Helper function to format data
│   ├── generateUserName.ts  # Helper function to generate usernames
│   └── validateUser.ts      # Validation logic for signup
└── server.ts                 # Entry point for the application
</pre>


#husk å kjøre npm install i client og server mappen

Husk å opprette 
.env fil i server mappen og legg til disse to streng...husk uten nummerering
1) MONGO_DB_CONNECTION = mongodb+srv://tenawyibza:VLuHzRorwaTF6MOa@cluster0.hivqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
2) PORT = 4000
