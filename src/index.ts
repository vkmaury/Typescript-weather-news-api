import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/user.routes';
import newsRoutes from './routes/news.routes';
import weatherRoutes from './routes/weather.routes'
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: number = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI: string = 'mongodb+srv://typescript-project:typescript-project@cluster0.q1zrkz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api', router);
app.use('/api', weatherRoutes);
app.use('/api', newsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
