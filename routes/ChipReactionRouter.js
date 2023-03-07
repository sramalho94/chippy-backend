const router = require('express').Router()
const controller = require('../controllers/ChipReactionController')
const middleware = require('../middleware')

router.get('/:chipId', controller.GetChipReactionByChipId)

module.exports = router
