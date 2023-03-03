const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserById
)



module.exports = router