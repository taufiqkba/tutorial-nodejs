const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator');
// membuat folder data
const dirPath = './data'
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file atau check file jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const saveContacts = (name, email, phoneNumber) => {
    const contact = { name, email, phoneNumber };
    const contacts = loadContact();

    // checks duplicates
    const duplicate = contacts.find((contact) => contact.name === name);
    if(duplicate){
        console.log(chalk.red.inverse.bold('Contact already registered!'));
        return false;
    }

    // check email
    if (email) {
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email not valid!'));
        return false;
        }
    }

    // check phone number
    if(!validator.isMobilePhone(phoneNumber, 'id-ID')){
        console.log(chalk.red.inverse.bold('Phone number not valid!'));
    return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log(chalk.green.inverse.bold('Thanks for submitted!'));
};

// List contacts

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.blueBright.inverse.bold('Contact list:  '));
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phoneNumber}`);
    
    });
};


// detail contacts
const detailContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) =>
        contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${name} not found!`));
        return false;
    };

    console.log(chalk.blueBright.inverse.bold(contact.name));
    console.log(contact.phoneNumber);
    if (contact.email) {
        console.log(contact.email);
    }
};

const deleteContact = (name) => {
    const contacts = loadContact();

    const newContact = contacts.filter((contact) => 
        contact.name.toLowerCase( ) !== name.toLowerCase() 
    );

    if (contacts.length === newContact.length) {
        console.log(chalk.red.inverse.bold(`${name} not found!`));
        return false;
    };

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact, null, 2));
    console.log(chalk.green.inverse.bold(`${name} has been deleted!`));
};

module.exports = {
    saveContacts,
    listContact,
    detailContact,
    deleteContact
};