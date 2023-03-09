// Importaciones de terceros
import axios from 'axios';

export class Search {
    constructor() {

    }
    
    async searchPlace( place = '' ) {
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
        } catch (error) {
            return [];   
        }
    }
}