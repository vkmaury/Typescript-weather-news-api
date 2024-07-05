import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';

export class WeatherController {
  static async getWeather(req: Request, res: Response) {
    const dto = req.body;

    try {
      const weather = await WeatherService.fetchWeather(dto);
      res.json(weather);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred.');
      }
    }
  }
}
