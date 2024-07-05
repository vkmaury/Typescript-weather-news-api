import axios from 'axios';
import { WeatherRequestDTO, WeatherResponseDTO } from '../dto/WeatherDTO';
import _ from 'lodash';

const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';
const API_KEY = "e14295e1e57545b9b3c102546240407";

export class WeatherService {
  static async fetchWeather(dto: WeatherRequestDTO): Promise<WeatherResponseDTO> {
    const params: any = {
      key: API_KEY,
    };

    if (dto.location) {
      params.q = dto.location;
    } else if (dto.latitude && dto.longitude) {
      params.q = `${dto.latitude},${dto.longitude}`;
    }

    const response = await axios.get(WEATHER_API_URL, { params });
    return response.data;

    
      
    
  }
}
