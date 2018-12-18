const router            = require('express').Router();
const apiController   = require("../controllers/apiController");

router.get('/', apiController.getAllAction)

router.get('/:id', apiController.getOneAction)

module.exports = router;