// const fs = require('fs'); // core modules
// const cetakNama = require('./coba'); // local modules
// const moment = require('moment') // third party module / npm module / node_modules
const coba = require('./coba');

console.log(
    coba.cetakNama('WEseleha sda'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(), 
    new coba.Orang()
);

