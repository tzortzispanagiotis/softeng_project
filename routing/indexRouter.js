const router               = require('express').Router(),
      indexController      = require('../controllers/indexController'),
       forgotenController = require('../controllers/forgotenController')
router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/forgottenpassword' , forgotenController.forgetPassword)

router.get('/contact', indexController.renderContactAction)

module.exports = router;