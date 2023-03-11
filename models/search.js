// Importaciones de terceros
import axios from 'axios';

export class Search {
    constructor() {

    }

    // Configuración de la petición
    get mapboxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en',
            'types': ['country', 'place']
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
}