import { mainMenu, pause } from "./helpers/inquirer.js"

console.clear();

const app = async() => {
    let option;

    do {
        option = await mainMenu();

        switch (option) {
            case 1:
                console.log('Find Place');
                break;
            case 2:
                console.log('Record');
                break;
        }

        await pause()
    } while (option !== 0);
}

app();