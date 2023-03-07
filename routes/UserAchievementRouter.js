const router = require('express').Router()
const controller = require('../controllers/UserAchievementController')
const middleware = require('../middleware')

router.get(
  '/:userId',
  controller.GetUserAchievementsByUserId
)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateUserAchievement  
)

module.exports = router