// Importaciones de Node
import fs from 'fs';

// Importaciones de terceros
import axios from 'axios';

export class Search {
    // Historial de consultas
    searchHistory = [];

    // Path DB
    dbPath = './db/dataBase.json'

    constructor() {
        this.loadDB()
    };

    // Configuración de la petición a mapbox
    get mapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en',
            'types': ['country', 'place']
        }
    };

    // Configuración de la petición a openWeather
    get openWeatherParams() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    };
    
    // Buscar lugares en mapbox
    async searchPlace( place = '' ) {
        try {
            // Instancia de axios
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapboxParams
            });

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

    // Buscar clima del lugar seleccionado por el usuario
    async checkWeather( lat, lon ){
        try {
            // Instancia de axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.openWeatherParams, lat, lon }
            });

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

    // Agregar término de búsqueda al historial de consultas
    addSearchHistory( place = "" ){
        // Prevenir registros duplicados
        if( this.searchHistory.includes( place.toLocaleLowerCase() ) ) return;

        // Agregar registro en el array del historial
        this.searchHistory.unshift( place.toLocaleLowerCase() );

        // Almacenar en DB
        this.saveDB();
    }

    // Almacenar historial de consultas en archivo .JSON
    saveDB(){
        const payload = {
            searchHistory: this.searchHistory
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(payload) )
    }

    // Leer historial de búsquedas almacenado en archivo .JSON
    loadDB(){
        if ( !fs.existsSync(this.dbPath) ) return;
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.searchHistory = data.searchHistory;
    }
}