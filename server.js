require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const app = express()
const cookieParser = require('cookie-parser')

// App Middlewares
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'views', 'includes')))
app.use(express.static(path.join(__dirname, 'components')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
	console.log(`MongoDB Atlas connect successfully!`)
})

// Route Imports
const LoginRoute = require('./routes/login-route')
const RegisterRoute = require('./routes/register-route')
const HomepageRoute = require('./routes/homepage-route')

// Route Middlewares
app.use('/', LoginRoute)
app.use('/', RegisterRoute)
app.use('/', HomepageRoute)

// Error handling for non-existing GET requests / routes
// app.use('/', async (req, res, next) => {
// 	res.render('error', { title: 'Error' })
// 	next()
// })
