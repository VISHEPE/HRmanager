const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'systemhr'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = db;