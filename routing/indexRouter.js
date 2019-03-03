const router               = require('express').Router(),
      indexController      = require('../controllers/indexController'),
      apiMiddlewares       = require('../middlewares/apiMiddlewares');

router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/contact', indexController.renderContactAction)

router.get("/filters", (req, res) => {
    res.render('filters')
  })

router.get('/insertshop', indexController.renderInsertShopAction)

router.get('/insertproduct', indexController.renderInsertProductAction)

router.get('/profile', indexController.renderProfileAction)
module.exports = router;