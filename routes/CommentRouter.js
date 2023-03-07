const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

router.get('/:chipId', controller.GetAllChipCommentsAndRemarks)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.PostComment
)

module.exports = router
