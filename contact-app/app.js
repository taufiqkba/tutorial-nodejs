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

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Insert your name: ', (name) => {
            resolve(name);
        });
    });
};

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Insert your email: ', (email) => {
            resolve(email);
        });
    });
};

const main = async() => {
    const name = await question1()
    const email = await question2()

    const contact = { name, email };
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact)

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
        console.log('THanks for submitted!');
        rl.close();
}

main()

// rl.question('Insert your name: ', (name) => {
//     rl.question('Insert phone number: ', (phoneNumber) => {
//         const contact = { name, phoneNumber };
//         const file = fs.readFileSync('data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(file);
//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
//         console.log('THanks for submitted!');
//         rl.close();
//     });
// });

