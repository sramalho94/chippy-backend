const router = require('express').Router()
const controller = require('../controllers/AchievementController')
const middleware = require('../middleware')

router.get('/', controller.GetAllAchievements)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateAchievement
)

router.put(
  '/:achievementId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateAchievement
)

router.delete(
  '/:achievementId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteAchievement
)

module.exports = router
