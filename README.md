### Wiki Project
## Description
Collaborative wiki platform allows users to create, edit, and collaborate on content directly in the browser. The following features are included:
- Create, edit, and delete posts.
- Versioning support for posts.
- Easy linking between pages and content navigation
- Content search functionality
- Tagging system for pages
- Display of unique tags with page counts
- Page statistics (views and version history)
- Commenting system with edit and delete options

## Main Pages
- **Authentication**: Sign in, sign up, and sign in using Google.
- **Homepage**: Displays all posts and posts published by signed-in users.
- **Post Page**: View post details, statistics, add/delete comments, and edit/delete posts for authorized users.
- **User Profile Page**: View user-specific information.
- **Write Post Page**: Create new posts.
- **Team Member Page**: View information about the team members.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Testing**: Jest

## Installation
### Prerequisites
Ensure the following are installed on your system:
- [Node.js]
- [MongoDB]

### Steps
**Clone the repository**:
   ```bash
   git clone https://github.com/6M2Y/Group3-Project.git
   cd Group3-Project
    ```
**Install dependencies**:
    ```bash
 cd client
 cd server
 npm install for both client and server
    ```
**Set up environment variables**:
 *** Create a `.env` file in the root directory of the client and add the following:
 REACT_APP_WIKI_API_URL=http://localhost:4000
 REACT_APP_FIREBASE_KEY =AIzaSyAA3TXo4be2v9pIBYA6pfI2os76s2Wm-KU

*** Create a `.env` file in the root directory of the server and add the following:
MONGO_DB_CONNECTION = mongodb+srv://tenawyibza:VLuHzRorwaTF6MOa@cluster0.hivqa.mongodb.net/?  retryWrites=true&w=majority&appName=Cluster0 
PORT = 4000
SECRET_KEY=801dd58ca505a7acef400f8b1f14a2dae9ee36224f03884e68bb623784d3d66125f4dd5a452a270a1869f68cec33dd01f795b1e87fdf950c2bdf3218c47669c6
# Firebase service account JSON file
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json  

## Start the application
  ```bash
npm start for both client and server
  ```

## Usage
**Access the application:**
-  Open your browser and go to `http://localhost:your_port_number`.
- This will open Homepage

**Sign In:**
    - Navigate to the "Sign In" page.
    - Enter your credentials (email and password).
    - Click "Sign In" to access your account.
    - Alternatively, use the "Sign in with Google" option for Google authentication.
    - If not signed up , navigate to the "Sign Up" Page.
**Create, edit, and delete pages:**
    - Navigate to the "Create Page" section to add new content.
    - Use the "Edit" button on existing pages to update content.
    - Use the "Delete" button to remove pages.
**Versioning:**
    - Each time a page is updated, a new version is saved.
    - View version history in post page to see changes over time.
**Linking and Navigation:**
    - Navigate through the content using the provided links and page Navigation.
**Search and Tags:**
    - Use the search bar to find content.
    - View and filter by tags to find related pages.
**Comments:**
    - Add comments to pages.
    - Edit or delete your comments as needed.
**Team Member Page:**
    - View information about the team members.

## Testing
Run tests using Jest:
```bash
npm test

## Frontend Project Structure
<pre>
client/
├── public/                      # Public folder for static files
│   ├── index.html               # Main HTML file for the React app
│   ├── manifest.json            # Web app manifest for PWA support
│   └── robots.txt               # SEO configuration
├── src/                         # Main source code for the application
│   ├── __mocks__/               # Mock files for API testing
│   │   └── axios.js             # Axios mock for API calls
│   ├── Common/                  # Shared utilities and configurations
│   │   ├── firebase.ts          # Firebase configuration
│   │   └── interfaces.ts        # TypeScript interfaces
│   ├── Components/              # Reusable UI components
│   │   ├── AuthForm.tsx         # Authentication form component
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── CardList.tsx         # List of card items
│   │   ├── CreateCard.tsx       # Component for creating a new card
│   │   ├── Footer.tsx           # Footer component
│   │   ├── GoogleAuth.tsx       # Google authentication component
│   │   ├── InputBox.tsx         # Input field component
│   │   ├── InputBox.test.tsx    # Test for InputBox component
│   │   ├── Modal.tsx            # Reusable modal component
│   │   ├── Navbar.tsx           # Navigation bar component
│   │   ├── Navbar.test.tsx      # Test for Navbar component
│   │   ├── TextArea.tsx         # Text area component
│   │   └── ToastContainer.tsx   # Toast notifications
│   ├── pages/                   # Pages for the application
│   │   ├── CreatePost.tsx       # Page to create a post
│   │   ├── Home.tsx             # Homepage
│   │   ├── PostPage.tsx         # Page to display a specific post
│   │   ├── Profile.tsx          # User profile page
│   │   ├── SearchPage.tsx       # Page for searching posts
│   │   ├── SignIn.tsx           # Sign-in page
│   │   ├── Signup.tsx           # Signup page
│   │   ├── Signup.test.tsx      # Test for Signup page
│   │   └── WikiEditorPage.tsx   # Wiki editor for articles
│   ├── Styles/                  # CSS files for styling
│   │   ├── Comments.css         # Styles for comments
│   │   ├── Footer.css           # Styles for the footer
│   │   ├── MainContent.css      # Styles for main content styles
│   │   └── Navbar.css           # Styles for the navigation bar
│   ├── utils/                   # Helper functions and custom hooks
│   │   ├── formDate.ts          # Date formatting utility
│   │   ├── QuillFormats.ts      # Formats for the Quill text editor
│   │   ├── Regex.ts             # Regular expressions for validation
│   │   ├── session.tsx          # Session management utilities
│   │   ├── useAuthForm.ts       # Custom hook for authentication forms
│   │   └── UserContext.tsx      # Context for user data
│   ├── App.css                  # Global styles for the application
│   ├── App.test.tsx             # Tests for the main App component
│   ├── App.tsx                  # Main application component
│   ├── index.css                # Styles for the index file
│   ├── index.tsx                # Entry point for the React application
│   ├── react-app-env.d.ts       # React TypeScript environment declarations
│   ├── reportWebVitals.ts       # Performance measurement
│   ├── setupTests.ts            # Setup for Jest tests
│   └── logo.svg                 # Application logo
├── .gitignore                   # Files and directories to ignore in Git
├── package-lock.json            # Locks dependencies to specific versions
├── package.json                 # Project dependencies and scripts
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration


## Backend Project Structure
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

