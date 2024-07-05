import axios from 'axios';
import { NewsResponseDTO } from '../dto/NewsDTO';
import _ from 'lodash';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = "62d3a5bca2cf41d2b11f6990cecaecea";

export class NewsService {
  static async fetchDailyNews(): Promise<NewsResponseDTO[]> {
    const params = {
      apiKey: API_KEY,
      country: 'us',
    };

    const response = await axios.get(NEWS_API_URL, { params });
    const articles = response.data.articles;

    return _.map(articles, (article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));
  }
}
