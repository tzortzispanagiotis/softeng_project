const router            = require('express').Router();
const userApiController   = require("../../controllers/API/userApiController"),
      auth              = require("../../policies/authenticationPolicy")

router.get('/', userApiController.getAllAction)

router.get('/:username', userApiController.getOneAction)

module.exports = router;