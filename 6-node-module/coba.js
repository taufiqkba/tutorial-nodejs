const name = 'taufiqkba';
const umur = 24;
const sayHallo = (name2, umur2) => {
console.log(`HI, my name is ${name2}, im ${umur2} years.`);
}

sayHallo(name, umur);

function cetakNama(nam) {
    return `HEllo my name is ${nam}`;
}

const PI = 3.14;

const mahasiswa = {
    nama : 'Heri Firmansyah',
    umur: 29,
    cetakMhs() {
        return `Hello my name is ${this.nama}, and i'm ${this.umur} years old`;
    },
};

class Orang {
    constructor() {
        console.log('Object orang has been created!');
    }
}
// export module cara 1
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// export module cara lain
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// };

// export module cara baru
module.exports = {cetakNama, PI, mahasiswa, Orang};