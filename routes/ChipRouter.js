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

router.delete(
  '/:chipId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteChip
)

router.get(
  '/',
  controller.GetAllChips
)

router.get(
  '/:userId',
  controller.GetChipsByUserId
)

router.get(
  ':/id',
  controller.GetChipById
)



module.exports = router