const router            = require('express').Router(),
      productApiController   = require("../../controllers/API/productApiController"),
      apiMiddlewares = require('../../middlewares/apiMiddlewares');

router.get('/', productApiController.getAllAction)

router.get('/:id', productApiController.getOneAction)

router.post('/', apiMiddlewares.checkToken, apiMiddlewares.checkRequestForProduct, productApiController.createAction)

router.put('/:id', apiMiddlewares.checkToken, apiMiddlewares.checkRequestForProduct, productApiController.fullUpdateAction)

router.patch('/:id', apiMiddlewares.checkToken, productApiController.partialUpdateAction)

router.delete('/:id', apiMiddlewares.checkToken, productApiController.deleteAction)

module.exports = router;