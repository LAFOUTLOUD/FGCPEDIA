function myFunction() {

	const password = document.getElementById('password');

	if (password.type === "password") {

		password.setAttribute('type', 'text');

	} else {

		password.setAttribute('type', 'password');

	}

};