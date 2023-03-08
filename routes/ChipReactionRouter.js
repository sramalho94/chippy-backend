const router = require('express').Router();
const controller = require('../controllers/ChipReactionController');
const middleware = require('../middleware');

router.get('/chip/:chipId', controller.GetChipReactionByChipId);

router.get('/user/:userId', controller.GetChipReactionByUserId);

router.post(
	'/',
	middleware.stripToken,
	middleware.verifyToken,
	controller.PostChipReaction
);

router.put(
	'/:chipReactionId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.UpdateChipReaction
);

router.delete(
	'/:chipReactionId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.DeleteChipReactionByChipReactionId
);

module.exports = router;
