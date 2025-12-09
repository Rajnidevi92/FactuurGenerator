const fs = require('fs'); // hiermee kunnen we bestanden lezen

// lees het JSON-bestand
const db = JSON.parse(fs.readFileSync('database.json', 'utf-8'));

// laat alle boeken zien
console.log(db.data.books);
