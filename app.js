const contacts = require('./contacts');
const yargs = require('yargs');

yargs.command({
    command: 'list',
    describe: 'Menampilkan kontak',
    handler() {
        contacts.listContact();
    },
});

yargs.command({
    command: 'add',
    describe: 'Menambahkan Kontak Baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        nohp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.nohp);
    },
});

// Menampilkan detail kontak berdasarkan nama
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Kontak',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// Menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Kontak',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

// Mengedit kontak berdasarkan nama
yargs.command({
    command: 'edit',
    describe: 'Mengedit kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Kontak',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email baru',
            demandOption: false,
            type: 'string',
        },
        nohp: {
            describe: 'Nomor HP baru',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.editContact(argv.nama, argv.email, argv.nohp);
    },
}).demandCommand();

yargs.parse();