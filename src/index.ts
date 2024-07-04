import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Application = express();
const PORT: number = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI: string = 'mongodb+srv://weather-news-typescript:weather-news-typescript@cluster0.xtxlgtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express and MongoDB!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
