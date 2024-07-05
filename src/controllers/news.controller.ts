import { Request, Response } from 'express';
import { NewsService } from '../services/news.service';

export class NewsController {
  static async getDailyNews(req: Request, res: Response) {
    try {
      const news = await NewsService.fetchDailyNews();
      res.json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred.');
      }
    }
  }
}
