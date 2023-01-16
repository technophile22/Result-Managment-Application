const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// connect with database
connectDB();

// set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/teacher', require('./routes/teacher'));
app.use('/student', require('./routes/student'));

//routes
app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => {
	console.log(`App is running at port: ${PORT}`);
});

// 404 page
app.use((req, res) => {
	res.status(404).render('error', { title: '404' });
});

module.exports = app;
