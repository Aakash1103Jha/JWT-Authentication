const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
})

module.exports = mongoose.model('users', UserModel)
