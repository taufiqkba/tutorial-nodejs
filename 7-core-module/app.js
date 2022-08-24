// Core module
// file system
const fs = require('node:fs');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello world! with synchronous');
// } catch (error) {
//     console.log(error);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello world with Asynchronous', (err) => {
//     console.log(err);
// })

// membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

// readline

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Insert your name: ', (name) => {
    rl.question('Insert phone number: ', (phoneNumber) => {
        const contact = { name, phoneNumber };
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
        console.log('THanks for submitted!');
        rl.close();
    });
});