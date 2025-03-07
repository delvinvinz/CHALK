// const fs = require('fs');

// const perintah = process.argv[2];
// const nama = process.argv[3];
// const nohp= process.argv[4];
// const email  = process.argv[5];
// const alamat = process.argv[6];

// if(perintah === 'tambah'){
//       const kontak = {nama, nohp, email, alamat};
//       const file = fs.readFileSync('data/contacts.json', 'utf-8');
//       const kontaks = JSON.parse(file);
//       kontaks.push(kontak);
//       fs.writeFileSync('data/contacts.json', JSON.stringify(kontaks, null, 2));
//       console.log('Data berhasil ditambahkan');
// }
// else{
//       console.log(`Perintah ${process.argv[2]} tidak ditemukan`);
// }

// const yargs = require('yargs');

// yargs.command(
//       'add',
//       'Menambahkan Kontak Baru',
//       () =>{},
//       (argv) => {
//             console.log(argv.nama);    
//       }  
// );

// yargs.parse();

const contacts = require('./contacts');

const yargs = require('yargs');

yargs.command({
      command: 'add',
      describe: 'Menambahkan Kontak Baru',
      builder: {
            nama: {
                  describe: 'Nama Lengkap',
                  demandOption: true,
                  type: 'string'
            },
            email: {
                  describe: 'Email',
                  demandOption: false,
                  type: 'string'
            },
            nohp: {
                  describe: 'Nomor Handphone',
                  demandOption: true,
                  type: 'string'
            },
      },
      handler(argv) {
            contacts.simpanContact(argv.nama, argv.email, argv.nohp);
      },
});
yargs.parse();