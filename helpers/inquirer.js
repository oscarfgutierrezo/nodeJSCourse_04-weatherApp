// Importaciones de terceros
import inquirer from 'inquirer';
import colors from 'colors';


// Configuración del inquirer para el menú principal
const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Find place`
            },
            {
                value: 2,
                name: `${ '2.'.green } Search History`
            },
            {
                value: 0,
                name: `${ '0.'.green } Exit`
            }
        ]
    }
]

// Mostrar menú principal al usuario
export const mainMenu = async() => {
    console.clear();
    // Título
    console.log('========================'.green);
    console.log('    Select an option'.green);
    console.log('========================\n'.green);
    
    // Menú
    const { option } = await inquirer.prompt(questions);
    return option;

};

// Generar un mensaje de confirmación de la opción seleccionada antes de limpiar la consola
export const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'intro',
            message: `Press ${'ENTER'.green} to continue`,
        }
    ];

    console.log('\n');

    await inquirer.prompt(question);
}

// Solicitar input escrito al usuario
export const readInput = async( message ) => {
    // Configuración del inquirer
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ) {
                if( value.length === 0 ){
                    return 'Please enter a value'
                };
                return true;
            }
        }
    ];

    // Retornar el valor ingresado por el usuario
    const { description } = await inquirer.prompt(question);
    return description;
}

// Listado de tareas para eliminar
export const placesList = async( places = [] ) => {
    // Construir las opciones para el inquirer
    const choices = places.map( (place, i) => {
        const { id, name } = place
        const index = `${i + 1}.`.green
        return {
            value: id,
            name: `${index} ${name}`
        }
    });
    
    choices.push({
        value: '0',
        name: `${'0.'.green} Cancel`
    })

    // Configuración del inquirer
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Choose a place',
            choices
        }
    ];
    
    // Retornar el id de la tarea seleccionada por el usuario
    const { id } = await inquirer.prompt(questions);
    return id;
}

// Mensaje de confirmación
export const confirmationMessage = async( message ) => {
    // Configuración del inquirer
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    // Retornar opción seleccionadad por el usuario
    const { ok } = await inquirer.prompt(question);
    return ok;
}

// Listado de tareas para marcar como completadas
export const tasksListToCheck = async( tasks = [] ) => {
    // Construir las opciones para el inquirer
    const choices = tasks.map( (task, i) => {
        const { id, description, finishedDate } = task
        const index = `${i + 1}.`.green
        return {
            value: id,
            name: `${index} ${description}`,
            checked: finishedDate ? true : false
        }
    });

    // Configuración del inquirer
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Check tasks',
            choices
        }
    ];
    
    // Retornar el id de la tarea seleccionada por el usuario
    const { ids } = await inquirer.prompt(question);
    return ids;
}