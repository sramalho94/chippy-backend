const router = require('express').Router();
const controller = require('../controllers/ChipController');
const middleware = require('../middleware');

router.post(
	'/',
	middleware.stripToken,
	middleware.verifyToken,
	controller.CreateChip
);

router.put(
	'/:chipId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.UpdateChip
);

router.delete(
	'/:chipId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.DeleteChip
);

router.get('/', controller.GetAllChips);

router.get('/user/:userId', controller.GetChipsByUserId);

router.get('/chip/:id', controller.GetChipById);

router.get('/flavor/:flavor', controller.GetChipsByFlavor);

router.get('/brand/:brand', controller.GetChipsByBrand);

router.get('/chip-name/:chipName', controller.GetChipsByChipName);

module.exports = router;
