const express = require('express');
const router = express.Router();

const battel = require('../routes/battel')
const user = require('../routes/user')

router.use('/battel', battel)
router.use('/user', user)

module.exports = router


