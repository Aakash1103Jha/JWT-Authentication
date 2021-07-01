const router = require('express').Router()
const HomepageController = require('../controllers/homepage-controller')

router.get('/homepage', HomepageController.getHomepage)

module.exports = router
