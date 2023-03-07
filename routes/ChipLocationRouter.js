const Router = require('express').Router();
const controller = require('../controllers/ChipLocationController');
const middleware = require('../middleware');

Router.get('/user/:userId', controller.GetChipLocationsByUserId);
Router.get('/region/:region', controller.GetChipLocationsByRegion);
Router.post(
	'/post',
	middleware.stripToken,
	middleware.verifyToken,
	controller.PostChipLocation
);
Router.put(
	'/update/:chipLocationId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.UpdateChipLocationById
);
Router.delete(
	'/delete/:chipLocationId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.DeleteChipLocationById
);
