const router               = require('express').Router(),
      userApiRouter   = require("../routing/API/userApiRouter"),
      productApiRouter = require("../routing/API/productApiRouter"),
      shopsApiRouter = require("../routing/API/shopApiRouter"),
      pricesApiRouter = require("../routing/API/pricesApiRouter"),
      authenticationController = require('../controllers/API/authController'),
      authenticationPolicy     = require('../policies/authenticationPolicy');
      
router.get('/login', 
    authenticationController.renderLoginAction)

router.post('/login',
    authenticationPolicy.login,
    authController.login)
    
router.use('/users', 
    userApiRouter)
router.use('/products', 
    productApiRouter)
router.use('/shops', 
    shopsApiRouter)
router.use('/prices', 
    pricesApiRouter)

module.exports = router;