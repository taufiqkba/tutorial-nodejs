const contacts = require('./contacts');

const main = async () => {
    const name = await contacts.writeQuestion('Insert you name: ');
    const email = await contacts.writeQuestion('Insert your email: ');

    contacts.saveContacts(name, email);
}

main();
