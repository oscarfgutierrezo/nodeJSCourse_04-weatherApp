// Importaciones de terceros
import axios from 'axios';

export class Search {
    constructor() {

    }

    // Configuración de la petición
    get mapboxParams() {
        return {
            'access_token': 'pk.eyJ1Ijoib3NjYXJmZ3V0aWVycmV6byIsImEiOiJjbGY0NHdyd3MwNWxuM3JxcmMwdXpzaDFvIn0.XkqkI-AJ4GfA8o7Nd1WSsw',
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
            const resp = await instance.get();
            console.log(resp.data);
        } catch (error) {
            console.log(error);
            return [];   
        }
    }
}