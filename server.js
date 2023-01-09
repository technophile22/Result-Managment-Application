const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();

//load environment variables
dotenv.config();

const PORT = process.env.PORT;

//connect with database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	console.log('API Running');
	res.send('Hello world!!');
});

app.listen(PORT, () => {
	console.log(`App is running at port: ${PORT}`);
});

module.exports = app;
