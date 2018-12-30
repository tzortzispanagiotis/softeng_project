const router               = require('express').Router(),
      userApiRouter   = require("../routing/API/userApiRouter"),
      productApiRouter = require("../routing/API/productApiRouter"),
      shopsApiRouter = require("../routing/API/shopApiRouter"),
      pricesApiRouter = require("../routing/API/pricesApiRouter");
      

router.use('/users', userApiRouter)
router.use('/products', productApiRouter)
router.use('/shops', shopsApiRouter)
router.use('/prices', pricesApiRouter)

module.exports = router;