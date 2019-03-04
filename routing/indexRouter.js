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

router.get("/filters", (req, res) => {
    res.render('filters')
  })

router.get('/insertshop', indexController.renderInsertShopAction)

router.get('/insertproduct', indexController.renderInsertProductAction)

router.get('/insertprice', indexController.renderInsertPriceAction)

module.exports = router;