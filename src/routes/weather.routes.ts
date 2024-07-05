import { Router } from 'express';
import  authMiddleware  from '../middleware/auth.middleware';
import { WeatherController } from '../controllers/weather.controller';

const router = Router();
router.post('/weather', authMiddleware, WeatherController.getWeather);

export default router;
