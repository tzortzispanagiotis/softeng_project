const router               = require('express').Router(),
      indexController      = require('../controllers/indexController'),
       forgotenController = require('../controllers/forgotenController'),
       recoveryController = require('../controllers/recoveryController');

router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/forgottenpassword' , forgotenController.renderChangePasswordAction)

router.post('/forgottenpassword' , forgotenController.changePassword)

router.get('/recoverpassword' , recoveryController.renderRecoverEmailAction)

router.post('/recoverpassword', recoveryController.createTokenAction)

router.get('/contact', indexController.renderContactAction)

module.exports = router;