const router               = require('express').Router(),
      indexController      = require('../controllers/indexController'),
       forgotenController = require('../controllers/forgotenController'),
       recoveryController = require('../controllers/recoveryController');

router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/forgottenpassword' , forgotenController.forgetPassword)

router.get('/recoverpassword' , recoveryController.renderRecoverEmailAction)

router.post('/recoverpassword', recoveryController.createTokenAction)

router.get('/contact', indexController.renderContactAction)

module.exports = router;