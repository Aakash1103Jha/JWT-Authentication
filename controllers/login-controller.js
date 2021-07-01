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
		return res.status(404).render('error', { title: 'Error', error: '404: Page not found' })
	}
	// find user
	let user = await UserModel.findOne({ email: req.body.email })
	if (!user) {
		return res.status(400).render('error', {
			title: 'Error',
			error: 'Either the email entered was incorrect or no user exists with this email',
		})
	}
	// check password
	// throw errors if any and redirect to error.ejs
	let validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) {
		return res.status(400).render('error', { title: 'Error', error: 'Invalid password' })
	}
	// generate JWT token
	// store JWT token in local storage for later use.
	let jwtToken = jwt.sign({ _id: user._id }, process.env.SECRET)
	// localStorage.setItem('token', jwtToken)
	res.cookie('JWTAuth', jwtToken, { path: '/homepage' })
	return res.redirect('/homepage')
	// login user if no errors and redirect to homepage

	next()
}
