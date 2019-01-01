const router                   = require('express').Router(),
      authenticationController = require('../../controllers/API/authController'),
      authenticationPolicy     = require('../../policies/authenticationPolicy');

router.get('/login', 
    authenticationController.renderLoginAction)
  
router.post('/login',
    authenticationPolicy.login,
    authenticationController.login)
    
router.post('/logout', 
    authenticationController.logout)

module.exports = router;