const fs = require('fs');
const chalk = require('chalk'); // Gunakan require, bukan import

const simpanContact = (nama, email, nohp) => {
    const filePath = 'contacts.json';
    let contacts = [];

    // Cek apakah file contacts.json sudah ada
    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath, 'utf-8');
        contacts = JSON.parse(fileBuffer);
    }

    // Cek duplikasi berdasarkan nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.bold('❌ Kontak sudah terdaftar, gunakan nama lain...!'));
        return false; // Stop eksekusi jika duplikat
    }

    // Jika tidak duplikat, tambahkan ke daftar kontak
    const contact = { nama, email, nohp };
    contacts.push(contact);

    // Simpan kembali ke file
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    console.log(chalk.green.bold('✅ Terima kasih sudah mengisi data Anda!'));
    return true;
};

module.exports = { simpanContact };
