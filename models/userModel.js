const db = require('../server').db;  

exports.findUserByUsernameAndPayroll = (username, payrollNumber, callback) => {
  db.query('SELECT * FROM users WHERE username = ? AND payroll_number = ?', [username, payrollNumber], callback);
};

exports.createUser = (username, email, password, callback) => {
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], callback);
};
