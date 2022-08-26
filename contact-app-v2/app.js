const yargs = require('yargs');
const contacts = require("./contacts");

// add contact
yargs.command({
    command: 'add',
    describe: 'Add new contacts',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'  
        },
        phoneNumber: {
            describe: 'Phone Number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            phoneNumber: argv.phoneNumber
        };
        contacts.saveContacts(argv.name, argv.email, argv.phoneNumber);
    },
}).demandCommand();

// Show/list all contacts
yargs.command({
    command: 'list',
    describe: 'Show all contacts data',
    handler() {
        contacts.listContact();
    },
});

// show detail a contacts
yargs.command({
    command: 'detail',
    describe: 'Show detail contacts data from name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.name);
    }, 
});

// delete contact
yargs.command({
    command: 'delete',
    describe: 'Delete contact data from name',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.name);
    }, 
});



yargs.parse();