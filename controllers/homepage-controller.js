const UserModel = require('../models/User-model')
const jwt = require('jsonwebtoken')

exports.getHomepage = async (req, res, next) => {
	let user = jwt.verify(req.cookies.JWTAuth, process.env.SECRET)
	let loggedUser = await UserModel.findById({ _id: user._id })
	res.render('homepage', {
		path: '/homepage',
		title: 'Homepage',
		user: loggedUser.firstName,
	})
}
