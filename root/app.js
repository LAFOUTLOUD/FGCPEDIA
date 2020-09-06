/* required packages */

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

/* node/express app */

const app = express();

/* connects the node/express app to you MDB database using mongoose */

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

/* 'users' collection schema */

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

/* creates the 'users' collection within the 'userDB' database, and connects the documents to the schema */

const User = new mongoose.model('User', userSchema);

/* allows the app to connect to your 'public' folder */

app.use(express.static('public'));

/* allows you to take the data from input fields and use them */

app.use(bodyParser.urlencoded({extended: true}));

/***********************************************************************************************/

/* HPR */

app.get('/', function(request, response) {

	// responds w/ the 'home page'
	response.sendFile(__dirname + '/index.html');

});

/***********************************************************************************************/

/* Sign Up */

app.get('/signup.html', function(request, response) {

	// responds w/ the 'signup page'
	response.sendFile(__dirname + '/pages' + '/authentication' + '/signup.html');

});

app.post('/signup.html', function(request, response) {

	// creates a new document whose values are taken from the input fields
	const newUser = new User({
		username: request.body.username,
		password: request.body.password
	});

	// checks the new document for errors
	newUser.save( function(err) {
		if (err) {
			console.log(err);
		} else {

			console.log('Added the data to the database');

			// response.send('Thanks for posting!');
			response.sendFile(__dirname + '/register_confirm.html');
		}
	});

});

/***********************************************************************************************/

/* Log In */

app.get('/login.html', function(request, response) {

	// responds w/ the 'login page'
	response.sendFile(__dirname + '/pages' + '/authentication' + '/login.html');

});

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

/***********************************************************************************************/

/* Browse the Dictionary, A */

app.get('/a.html', function(request, response) {

	// responds w/ 'a.html'
	response.sendFile(__dirname + '/pages' + '/browse' + '/a.html');

});

/***********************************************************************************************/

/* Home */

app.get('/index.html', function(request, response) {

	// responds w/ the 'index page'
	response.sendFile(__dirname + '/index.html');

});

/***********************************************************************************************/

/* Contact */

app.get('/contact.html', function(request, response) {

	response.sendFile(__dirname + '/pages' + '/directory' + '/contact.html');

});

// app.post('/contact', function(req, res) {

// });

/***********************************************************************************************/

/* creates the server */

app.listen(3000, function() {
	console.log('Server is running on port #3000.');
});