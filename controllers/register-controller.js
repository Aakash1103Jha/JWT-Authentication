const { validatePassword } = require('../components/js/validate-password')
const UserModel = require('../models/User-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.getRegister = async (req, res, next) => {
	res.render('register', {
		path: '/register',
		title: 'Register',
	})
}

exports.postRegister = async (req, res, next) => {
	// check for data
	if (!req.body) {
		return res.send('Something went wrong')
	}
	// check if user already exists
	let existingUser = await UserModel.findOne({ email: req.body.email })
	if (existingUser) {
		return res.redirect(400, '/register')
	}
	// hash password
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	// create user
	// redirect to login
	const user = new UserModel({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashPassword,
	})
	try {
		await user.save()
		return res.redirect(200, '/login')
	} catch (e) {
		console.log(e)
	}
	next()
}
