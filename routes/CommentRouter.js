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

router.put(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateComment
)

router.delete(
  '/:commentId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCommentByCommentId
)

module.exports = router
