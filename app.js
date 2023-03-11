// Importaciones locales
import { mainMenu, pause, readInput } from "./helpers/inquirer.js"
import { Search } from "./models/search.js";

console.clear();

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
                const place = await readInput('Write the place you want to search for:');
                // Buscar los lugares vinculados a la búsqueda del usuario
                await search.searchPlace(place)

                // Permitir al usuario seleccionar uno de los lugares

                // Consultar el clima del lugar seleccionado

                // Mostrar los resultados
                console.log(`\n${place}\n`.green);
                console.log('Latitude:');
                console.log('Longitude:');
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