const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const router = express.Router();

const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware:', req.session.user); // Debugging
    if (req.session.user && req.session.user.role === 'HR') {
        next();
    } else {
        console.log('Unauthorized access attempt'); // Debugging
        res.redirect('/login');
    }
};


// Admin Dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', { user: req.session.user });
});

// Add HR (Admin) User
router.post('/add-hr', isAdmin, async (req, res) => {
    const { first_name, last_name, payroll_number, email, phone_number, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO employees (first_name, last_name, payroll_number, email, phone_number, password, role, hire_date) VALUES (?, ?, ?, ?, ?, ?, "HR", CURDATE())',
            [first_name, last_name, payroll_number, email, phone_number, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Error inserting HR:', err);
                    res.status(500).send('Error adding HR.');
                } else {
                    res.redirect('/admin/dashboard');
                }
            }
        );
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Error adding HR.');
    }
});

module.exports = router;
