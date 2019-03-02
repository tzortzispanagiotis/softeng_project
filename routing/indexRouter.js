const router               = require('express').Router(),
      indexController      = require('../controllers/indexController');

router.get('/', indexController.renderIndexAction)

router.get('/login', indexController.renderLoginAction)

router.get('/contact', indexController.renderContactAction)

router.get("/searchResults", indexController.renderSearchResultsAction);

router.get('/insertshop', indexController.renderInsertShopAction)

router.get('/insertproduct', indexController.renderInsertProductAction)


module.exports = router;
