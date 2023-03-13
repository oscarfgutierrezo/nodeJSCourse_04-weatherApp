// Importaciones de terceros
import * as dotenv from 'dotenv'

// Importaciones locales
import { mainMenu, pause, placesList, readInput } from "./helpers/inquirer.js"
import { Search } from "./models/search.js";


// Configuración dotenv
dotenv.config();

console.clear()

const app = async() => {
    let option;

    // Intancia de las clase Search
    const search = new Search();

    // Mostrar el menú principal mientras la opción seleccionada sea diferente a "0"
    do {
        // Opción seleccionada por el usuario en el menú principal
        option = await mainMenu();

        // Manejo de las diferentes opciones del menú principal
        switch (option) {
            case 1:
                // Mostrar mensaje y capturar input del usuario
                const userQuery = await readInput('Write the place you want to search for:');

                // Buscar los lugares vinculados a la búsqueda del usuario
                const places = await search.searchPlace(userQuery);

                // Permitir al usuario seleccionar uno de los lugares
                const id = await placesList(places);
                if ( id === '0' ) continue;
                const { name, latitude, longitude } = places.find( place => place.id === id );

                // Almacenar búsqueda en historial
                search.addSearchHistory( name );

                // Consultar el clima del lugar seleccionado
                const { description, averageTemp, minTemp, maxTemp } = await search.checkWeather( latitude, longitude );

                // Mostrar los resultados
                console.log(`\nLocation: ${name.green}`);
                console.log(`Latitude: ${latitude}`);
                console.log(`Longitude: ${longitude}`);
                console.log(`Average Tempeture: ${averageTemp} °C`);
                console.log(`Minimum Tempeture: ${minTemp} °C`);
                console.log(`Maximim Tempeture: ${maxTemp} °C`);
                console.log(`Weather description: ${description.green}`);
                
                break;
            case 2:
                search.searchHistory.forEach( (place, i) => {
                    const index = `${ i + 1 }.`.green;
                    console.log( `${index} ${place}` );
                })
                break;
        }

        // Mensaje de confirmación de la opción seleccionada
        await pause()
    } while (option !== 0);
}

app();