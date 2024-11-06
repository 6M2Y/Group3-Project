import 'dotenv/config'
import app from './app';
import mongooseDb from 'mongoose';


const PORT = process.env.PORT || 5000;

mongooseDb.connect(process.env.MONGO_DB_CONNECTION as string)
    .then(() => {
        console.log("Database connected")
        app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
            })


