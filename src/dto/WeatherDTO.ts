export interface WeatherRequestDTO {
    location: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface WeatherResponseDTO {
    location: string;
    temperature: number;
    description: string;
  }
  