const Router = require('express').Router();
const controller = require('../controllers/LocationController');
const middleware = require('../middleware');

Router.get('/:locationId', controller.GetLocationsById);
Router.post(
	'/post',
	middleware.stripToken,
	middleware.verifyToken,
	controller.CreateLocation
);
Router.put(
	'/update',
	middleware.stripToken,
	middleware.verifyToken,
	controller.UpdateLocation
);
Router.delete(
	'/delete',
	middleware.stripToken,
	middleware.verifyToken,
	controller.DeleteLocation
);

module.exports = Router;
