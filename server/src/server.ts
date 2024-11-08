import 'dotenv/config'; // Load environment variables
import app from './app'; // Import app from app.ts
import mongoose from 'mongoose'; // Import mongoose

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION as string)
  .then(() => {
    console.log("Database connected");
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
