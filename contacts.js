const fs = require('fs');
const chalk = require('chalk');

const filePath = 'data/contacts.json';

// Fungsi untuk memuat kontak dari file
const loadContact = () => {
    try {
        const fileBuffer = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileBuffer);
    } catch (error) {
        return []; // Jika file tidak ada atau error, kembalikan array kosong
    }
};

// Fungsi untuk menampilkan daftar kontak
const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.bold('Daftar Kontak:'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.nohp}`);
    });
};

// Fungsi untuk menyimpan kontak baru
const simpanContact = (nama, email, nohp) => {
    let contacts = loadContact();

    // Cek duplikasi berdasarkan nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.bold('❌ Kontak sudah terdaftar, gunakan nama lain...!'));
        return false;
    }

    // Tambahkan kontak baru
    const contact = { nama, email, nohp };
    contacts.push(contact);

    // Simpan ke file
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    console.log(chalk.green.bold('✅ Terima kasih sudah mengisi data Anda!'));
    return true;
};

// Fungsi untuk menampilkan detail kontak
const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.bold(`❌ Kontak ${nama} tidak ditemukan`));
        return false;
    }
    console.log(chalk.cyan.bold(`Nama: ${contact.nama}`));
    console.log(chalk.cyan.bold(`Email: ${contact.email || 'Tidak ada email'}`));
    console.log(chalk.cyan.bold(`No HP: ${contact.nohp}`));
};

// Fungsi untuk menghapus kontak
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.bold(`❌ Kontak ${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync(filePath, JSON.stringify(newContacts, null, 2));
    console.log(chalk.green.bold(`✅ Kontak ${nama} berhasil dihapus`));
    return true;
};

// Fungsi untuk mengedit email dan nomor HP berdasarkan nama
const editContact = (nama, email, nohp) => {
    let contacts = loadContact();
    const index = contacts.findIndex((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (index === -1) {
        console.log(chalk.red.bold(`❌ Kontak ${nama} tidak ditemukan`));
        return false;
    }

    // Jika email diberikan, perbarui email
    if (email) {
        contacts[index].email = email;
    }

    // Jika nomor HP diberikan, perbarui nomor HP
    if (nohp) {
        contacts[index].nohp = nohp;
    }

    // Simpan perubahan ke file
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
    console.log(chalk.green.bold(`✅ Kontak ${nama} berhasil diperbarui!`));
    return true;
};

module.exports = { simpanContact, listContact, detailContact, deleteContact, editContact };


