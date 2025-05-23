import express from 'express';
import  "dotenv/config";
import authRouter from './routes/authRoute.js';
import connectDB from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
    // Connect to the database
    connectDB();
});