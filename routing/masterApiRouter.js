const router               = require('express').Router();
const userApiRouter   = require("../routing/userApiRouter");

router.use('/user', userApiRouter)

module.exports = router;