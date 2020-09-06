// required packages
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

// node/express app
const app = express();

// connects the node/express app to you MDB database using mongoose
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

// the code that creates new users
const userSchema = {
	username: String,
	password: String
};

// creates the 'users' collection within the 'userDB' database
const User = new mongoose.model('User', userSchema);

// allows the app to connect to your css folder
app.use(express.static('css'));

// allows you to take the data from input fields and use them
app.use(bodyParser.urlencoded({extended: true}));

/* get requests */

// HPR
app.get('/', function(request, response) {

	// responds w/ the 'home page'
	response.sendFile(__dirname + '/index.html');
});

// signup page
app.get('/signup.html', function(request, response) {

	// the server responds by sending back the login page, 'login.html'
	response.sendFile(__dirname + '/pages' + '/authentication' + '/signup.html');
});

// login page
app.get('/login.html', function(request, response) {

	// the server responds by sending back the login page, 'login.html'
	response.sendFile(__dirname + '/pages' + '/authentication' + '/login.html');
});

// home
app.get('/index.html', function(request, response) {

	// the server responds by sending back the home page, 'index.html'
	response.sendFile(__dirname + '/index.html');
});

/* post requests */

// signup page
app.post('/signup.html', function(request, response) {

	// creates a new document whose values are taken from the input fields
	const newUser = new User({
		username: request.body.username,
		password: request.body.password
	});

	newUser.save( function(err) {
		if (err) {
			console.log(err);
		} else {

			console.log('Added the data to the database');

			response.send('Thanks for posting!');
		}
	});
});

// login page
app.post('/login', function(request, response) {
	
	const username = request.body.username;
	const password = request.body.password;

	User.findOne({email: username}, function(err, foundUser){
		if(err) {
			console.log(err);
		} else {

			// if there is a foundUser (a specific email value with a specific username value)
			if (foundUser) {

				// we check if the foundUser has a password that matches the password recieved from the input field
				if (foundUser.password === password) {
					response.render('secrets');
				}
			}
		}
	});

});

// creates the server
app.listen(3000, function() {
	console.log('Server is running on port #3000.');
});