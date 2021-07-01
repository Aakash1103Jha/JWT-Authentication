const router = require('express').Router()
const RegisterController = require('../controllers/register-controller')

router.get('/', RegisterController.getRegister)
router.post('/register', RegisterController.postRegister)

module.exports = router
