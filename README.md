## Frontend Project Structure
coming up....


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

#husk å kjøre npm install i client og server mappen

**Husk å opprette**
.env fil ved client

REACT_APP_WIKI_API_URL=http://localhost:4000
REACT_APP_FIREBASE_KEY =AIzaSyAA3TXo4be2v9pIBYA6pfI2os76s2Wm-KU

  **Husk å opprette**
.env fil ved server mappen

MONGO_DB_CONNECTION = mongodb+srv://tenawyibza:VLuHzRorwaTF6MOa@cluster0.hivqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 
PORT = 4000
SECRET_KEY=801dd58ca505a7acef400f8b1f14a2dae9ee36224f03884e68bb623784d3d66125f4dd5a452a270a1869f68cec33dd01f795b1e87fdf950c2bdf3218c47669c6
# Firebase service account JSON file
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json   
</pre>

