const bcrypt = require('bcryptjs');
const db = require('../models/userModel');

exports.login = (req, res) => {
  const { username, payrollNumber } = req.body;
  
  db.findUserByUsernameAndPayroll(username, payrollNumber, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect('/dashboard');
    } else {
      res.send('Invalid credentials');
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.createUser(username, email, hashedPassword, (err, results) => {
    if (err) throw err;
    res.redirect('/login');
  });
};
