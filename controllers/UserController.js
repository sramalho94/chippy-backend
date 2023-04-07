const { User } = require('../models');

const GetUserById = async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.params.userId } });
		res.status(200).send(user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const UpdateUser = async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);
		const updatedUser = await User.update(req.body, {
			where: { id: userId },
			returning: true
		});
		res.status(200).send(updatedUser);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteUser = async (req, res) => {
	try {
		let userId = req.params.userId;
		await User.destroy({ where: { id: userId } });
		res.status(200).send({ message: `Deleted user with an id of ${userId}` });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetUserById,
	UpdateUser,
	DeleteUser
};
