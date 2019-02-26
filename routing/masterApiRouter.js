const router               = require('express').Router(),
      userApiRouter   = require("../routing/API/userApiRouter"),
      productApiRouter = require("../routing/API/productApiRouter"),
      shopsApiRouter = require("../routing/API/shopApiRouter"),
      pricesApiRouter = require("../routing/API/pricesApiRouter"),
      authenticationController = require('../controllers/API/authController'),
      authenticationPolicy     = require('../policies/authenticationPolicy'),
      apiMiddlewares            = require('../middlewares/apiMiddlewares');
      
router.get('/login', 
    authenticationController.renderLoginAction)

router.post('/login',
    authenticationPolicy.login,
    authenticationController.login)

router.post('/signup',
    authenticationController.signup)

router.post('/logout', 
    authenticationController.logout)

router.use('/users', 
    userApiRouter)
router.use('/products', 
    productApiRouter)
router.use('/shops', 
    shopsApiRouter)
router.use('/prices', 
    pricesApiRouter)

module.exports = router;