import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './config/db.js';
import jobRoutes from"./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js"
import authRoutes from "./routes/authRoutes.js"


import cors from 'cors';


// config dotenv
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// rest api
app.get('/', (req, res) => {
    res.send({
        message: 'welcome to job portal'
    });
});
// routes
app.use('/api/jobs',jobRoutes);
app.use('/api/applications',applicationRoutes);
app.use('/api/auth', authRoutes);

// serve uploaded CVs
app.use('/uploads',express.static('uploads'));
// port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
