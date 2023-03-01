const router = require('express').Router()
const controller = require('../controllers/ChipController')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateChip
)

router.put(
  '/:chipId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateChip
)







module.exports = router