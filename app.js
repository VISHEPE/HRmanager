const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const employeeRouter = require('./routes/employee');

const app = express();


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});