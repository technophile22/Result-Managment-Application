const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('strictQuery', true);
//connect with database
mongoose.connect(
	'mongodb+srv://test:test@resultmanagement.k0v67r6.mongodb.net/?retryWrites=true&w=majority',
	() => {
		console.log('mongo db is connected successfully');
	},
);

app.get('/', (req, res) => {
	res.send('Hello world!!');
});

app.listen(3000, () => {
	console.log('App is running at port: 3000');
});
