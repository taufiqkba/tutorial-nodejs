const fs = require('node:fs');
// const chalk = require('chalk');
// const validator = require('validator');

// create folder 
const dirPath = './data'
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file atau check file jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}
// get all data contacts.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// find contact by name
const findContact = (name) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) =>
        contact.name.toLowerCase() === name.toLowerCase()
    );
    return contact
}

// function to replace new data contacts.json
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2))
}

// add/create new contact
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

// check duplicates name
const checkDuplicate = (name) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.name === name)
}

// delete contact
const deleteContact = (name) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => contact.name !== name)
    saveContacts(filteredContacts)
}

// to update contact
const updateContacts = (newContact) => {
    const contacts = loadContact()
    // remove oldName when the name same with oldName 
    const filteredContacts = contacts.filter((contact) => contact.name !== newContact.oldName)
    delete newContact.oldName
    filteredContacts.push(newContact)
    saveContacts(filteredContacts)
}

module.exports = {
    loadContact,
    findContact,
    addContact,
    checkDuplicate,
    deleteContact,
    updateContacts
}