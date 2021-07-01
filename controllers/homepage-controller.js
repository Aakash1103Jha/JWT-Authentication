const UserModel = require('../models/User-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.getHomepage = async (req, res, next) => {
	let user = jwt.verify(req.cookies.JWTAuth, process.env.SECRET)
	let loggedUser = await UserModel.findById({ _id: user._id })
	console.log(loggedUser)

	res.render('homepage', {
		path: '/homepage',
		title: 'Homepage',
		firstName: loggedUser.firstName,
	})
}

exports.getLoggedUser = async (req, res, next) => {
	let user = jwt.verify(req.cookies.JWTAuth, process.env.SECRET)
	let loggedUser = await UserModel.findById({ _id: user._id })
	console.log(loggedUser)
}
