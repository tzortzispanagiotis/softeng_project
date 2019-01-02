const router            = require('express').Router(),
      productApiController   = require("../../controllers/API/productApiController"),
      apiMiddlewares = require('../../middlewares/apiMiddlewares')

// Middleware to checkrequest for POST, PUT. If request is valid, creates an x object
// in request. params.



router.get('/', productApiController.getAllAction)

router.get('/:id', productApiController.getOneAction)

router.post('/', apiMiddlewares.checkRequestForProduct, productApiController.createAction)

router.put('/:id', apiMiddlewares.checkRequestForProduct, productApiController.fullUpdateAction)

router.patch('/:id', productApiController.partialUpdateAction)

router.delete('/:id', productApiController.deleteAction)

module.exports = router;