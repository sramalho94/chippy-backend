const router = require('express').Router()
const controller = require('../controllers/ChipReactionController')
const middleware = require('../middleware')

router.get('/chip/:chipId', controller.GetChipReactionByChipId)

router.get('/user/:userId', controller.GetChipReactionByUserId)

router.post('/', controller.PostChipReaction)

router.module.exports = router
