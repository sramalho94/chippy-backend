const router = require('express').Router()
const controller = require('../controllers/ChipController')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateChip
)









module.exports = router