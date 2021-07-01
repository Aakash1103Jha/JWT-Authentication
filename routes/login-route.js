const router = require('express').Router()
const LoginController = require('../controllers/login-controller')

router.get('/login', LoginController.getLogin)
router.post('/login', LoginController.postLogin)

module.exports = router
