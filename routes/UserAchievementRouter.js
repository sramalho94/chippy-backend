const router = require('express').Router()
const controller = require('../controllers/UserAchievementController')
const middleware = require('../middleware')

router.get(
  '/:userId',
  controller.GetUserAchievementsByUserId
)

module.exports = router