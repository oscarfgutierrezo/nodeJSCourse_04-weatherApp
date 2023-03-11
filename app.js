// Importaciones de terceros
import * as dotenv from 'dotenv'

// Importaciones locales
import { mainMenu, pause, placesList, readInput } from "./helpers/inquirer.js"
import { Search } from "./models/search.js";


// Configuración dotenv
dotenv.config();

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
                // Consultar el clima del lugar seleccionado

                // Mostrar los resultados
                const { name, latitude, longitude } = places.find( place => place.id === id )
                console.log(`\n${name}\n`.green);
                console.log(`Latitude: ${latitude}`);
                console.log(`Longitude: ${longitude}`);
                console.log('Average Tempeture:');
                console.log('Minimum Tempeture:');
                console.log('Maximim Tempeture:');

                break;
            case 2:
                console.log('Record');
                break;
        }

        // Mensaje de confirmación de la opción seleccionada
        await pause()
    } while (option !== 0);
}

app();