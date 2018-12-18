const router            = require('express').Router();
const userApiController   = require("../controllers/userApiController");

router.get('/', userApiController.getAllAction)

router.get('/:username', userApiController.getOneAction)

module.exports = router;