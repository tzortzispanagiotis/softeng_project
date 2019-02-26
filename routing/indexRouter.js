const router               = require('express').Router(),
      indexController      = require('../controllers/indexController');

router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/contact', indexController.renderContactAction)

module.exports = router;