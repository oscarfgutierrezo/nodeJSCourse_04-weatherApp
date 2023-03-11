// Importaciones de terceros
import axios from 'axios';

export class Search {
    constructor() {

    }

    // Configuración de la petición a mapbox
    get mapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en',
            'types': ['country', 'place']
        }
    }

    get openWeatherParams() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }
    
    async searchPlace( place = '' ) {
        try {
            // Instancia de axios
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapboxParams
            })

            // Petición http
            const { data } = await instance.get();
            const placesInfo = data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1]
            }));
            return placesInfo;
        } catch (error) {
            console.log(error);
            return [];   
        }
    }

    async checkWeather( lat, lon ){
        try {
            // Instancia de axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.openWeatherParams, lat, lon }
            })

            // Petición http
            const { data } =  await instance.get();
            const { weather, main } = data;
            const weatherDescription = {
                description: weather[0].description,
                averageTemp: main.temp,
                minTemp: data.main.temp_min,
                maxTemp: data.main.temp_max
            };
            return weatherDescription;
        } catch (error) {
            console.log(error);
            return []; 
        }
    }
}