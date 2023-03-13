// Importaciones de terceros
import * as dotenv from 'dotenv'

// Importaciones locales
import { mainMenu, pause, placesList, readInput } from "./helpers/inquirer.js"
import { Search } from "./models/search.js";
import { displayResults } from './helpers/displayResults.js';

const app = async() => {
    // Configuración dotenv
    dotenv.config();
    
    // Almacenar opción seleccionada por el usuario
    let option;

    // Intancia de las clase Search
    const search = new Search();

    // Mostrar el menú principal mientras la opción seleccionada sea diferente a "0"
    do {
        // Limpiar consola antes de imprimir el menú principal
        console.clear()

        // Opción seleccionada por el usuario en el menú principal
        option = await mainMenu();

        // Manejo de las diferentes opciones del menú principal
        switch (option) {
            // Búsqueda de lugares
            case 1:
                // Mostrar mensaje y capturar input del usuario
                const userQuery = await readInput('Write the place you want to search for:');

                // Buscar los lugares vinculados a la búsqueda del usuario
                const places = await search.searchPlace(userQuery);

                // Permitir al usuario seleccionar uno de los lugares
                const id = await placesList(places);
                if ( id === '0' ) continue;

                // Info del lugar seleccionado
                const placeSelected = places.find( place => place.id === id );
                const { latitude, longitude } = placeSelected;

                // Almacenar búsqueda en historial
                search.addHistory( placeSelected );

                // Consultar el clima del lugar seleccionado
                const weatherInfo = await search.checkWeather( latitude, longitude );

                // Mostrar los resultados
                displayResults( placeSelected, weatherInfo );
                
                break;

            // Mostrar historial de consultas
            case 2:
                // Permitir al usuario seleccionar uno de los lugares
                const historyId = await placesList(search.history);
                if ( historyId === '0' ) continue;

                // Info del lugar seleccionado
                const hPlaceSelected = search.history.find( place => place.id === historyId );
                const { latitude: hLatitude  , longitude: hLongitude } = hPlaceSelected;
                
                // Consultar el clima del lugar seleccionado
                const hWeatherInfo = await search.checkWeather( hLatitude, hLongitude );

                // Mostrar los resultados
                displayResults( hPlaceSelected, hWeatherInfo );

                break;
        }

        // Mensaje de confirmación de la opción seleccionada
        await pause()
    } while (option !== 0);
}

app();