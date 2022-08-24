// Synchronous


// const getUserSync = (id) => {
//     // let nama = '';
//     // if ( id === 1) {
//     //     nama = 'Taufiqkba';
//     // }else {
//     //     nama = 'Kyurnianawan';
//     // }
//     const nama = id === 1 ? 'Taufiq' : 'Kurniawan'
//     return { id, nama};
// }

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const userWifi = 'Minta password Wifi';
// console.log(userWifi);


//  Asynchornous

const getUser = (id, cb) => {
    const time = id === 1 ? 3000 : 2000;
    setTimeout(() => {
        const nama = id === 1 ? 'Taufiq' : 'Kurniawan';
        cb({id, nama});
    }, time);
};

const userSatu = getUser(1, (hasil) => {
    console.log(hasil);
})

const userDua = getUser(2, (hasil) => {
    console.log(hasil);
})

const userWifi = 'Minta password Wifi';
console.log(userWifi);