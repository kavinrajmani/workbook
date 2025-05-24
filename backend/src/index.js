import express from 'express';
import  "dotenv/config";
import connectDB from './lib/db.js';
import cors from 'cors';
import authRouters from './routes/authRoute.js';
import bookRouters from './routes/bookRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouters);
app.use('/api/books', bookRouters);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
    // Connect to the database
    connectDB();
});