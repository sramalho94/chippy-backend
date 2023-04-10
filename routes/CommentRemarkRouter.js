const router = require('express').Router()
const controller = require('../controllers/CommentRemarkController')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateCommentRemark
)

router.put(
  '/:commentRemarkId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateCommentRemark
)

router.delete(
  '/:commentRemarkId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteCommentRemark
)

module.exports = router;