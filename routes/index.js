const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { payroll_number, first_name } = req.body;
    db.query('SELECT * FROM employees WHERE payroll_number = ? AND first_name = ?', [payroll_number, first_name], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }

        if (results.length > 0) {
            console.log('Login successful:', results[0]); // Debugging
            req.session.user = results[0];
            const redirectUrl = results[0].role === 'HR' ? '/admin/dashboard' : '/employee/dashboard';
            console.log('Redirecting to:', redirectUrl); // Debugging
            res.redirect(redirectUrl);
        } else {
            console.log('Invalid credentials:', req.body); // Debugging
            res.send('Invalid credentials');
        }
    });
});


module.exports = router;