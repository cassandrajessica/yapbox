import dotenv from "dotenv";
import connectMongo from "./db/connection.js";
import express from "express";
import cors from "cors";
import userRoutes from './routes/auth.js';

const PORT = process.env.PORT || 5000;
const app = express();

//load env variables
dotenv.config();

// connect mongo server
connectMongo();

// middleware
app.use(cors());
app.use(express.json());

// use routes
app.use('/api/users', userRoutes);

// start express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
