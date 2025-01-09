const express = require('express');
const db = require('../config/db');
const router = express.Router();

const isEmployee = (req, res, next) => {
    console.log('isEmployee middleware:', req.session.user); // Debugging
    if (req.session.user && req.session.user.role === 'employee') {
        next();
    } else {
        console.log('Unauthorized access attempt'); // Debugging
        res.redirect('/login');
    }
};


router.get('/dashboard', isEmployee, (req, res) => {
    res.render('employee/dashboard', { user: req.session.user });
});

router.get('/payslips', isEmployee, (req, res) => {
    const userId = req.session.user.id;
    db.query('SELECT * FROM payslips WHERE user_id = ?', [userId], (err, results) => {
        if (err) throw err;
        res.render('employee/payslips', { user: req.session.user, payslips: results });
    });
});

module.exports = router;
