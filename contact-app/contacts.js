const { write } = require('node:fs');
const fs = require('node:fs');
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

const writeQuestion = (questions) => {
    return new Promise((resolve, reject) => {
        rl.question(questions, (name) => {
            resolve(name);
        });
    });
};

const saveContacts = (name, email) => {
    const contact = { name, email };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log('THanks for submitted!');
    rl.close();
};

module.exports = {
    writeQuestion,
    saveContacts
};