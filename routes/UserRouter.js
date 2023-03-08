const router = require('express').Router();
const controller = require('../controllers/UserController');
const middleware = require('../middleware');

router.get(
	'/:userId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.GetUserById
);

router.put(
	'/:userId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.UpdateUser
);

router.delete(
	'/:userId',
	middleware.stripToken,
	middleware.verifyToken,
	controller.DeleteUser
);

module.exports = router;
