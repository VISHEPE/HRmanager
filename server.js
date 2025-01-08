const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require('./db');
const app = express();
const port = 3000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


