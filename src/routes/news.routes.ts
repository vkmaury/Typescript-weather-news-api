import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';
import  authMiddleware  from '../middleware/auth.middleware';

const router = Router();

router.get('/news',authMiddleware, NewsController.getDailyNews);

export default router;
