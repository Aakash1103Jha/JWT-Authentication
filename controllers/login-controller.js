const UserModel = require('../models/User-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.getLogin = async (req, res, next) => {
	res.render('login', {
		path: '/',
		title: 'Login',
	})
}

exports.postLogin = async (req, res, next) => {
	// validate user input
	if (!req.body) {
		res.status(400).redirect('/', {
			title: 'Error',
			error: 'Something went wrong while loggin you in',
		})
	}
	// find user
	let user = await UserModel.findOne({ email: req.body.email })
	if (!user) {
		res.status(400).redirect('/', {
			title: 'Error',
			error: 'Could not find user with this email',
		})
	}
	// check password
	// throw errors if any and redirect to error.ejs
	let validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) {
		res.redirect('/', {
			title: 'Error',
			error: 'Please check your password',
		})
	}
	// generate JWT token
	// store JWT token in local storage for later use.
	let jwtToken = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET)
	// localStorage.setItem('token', jwtToken)
	res.cookie('JWTAuth', jwtToken, { path: '/homepage' })
	return res.redirect('/homepage')
	// login user if no errors and redirect to homepage

	next()
}
