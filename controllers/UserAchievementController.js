const { UserAchievements, User, Achievements } = require('../models');

const GetUserAchievementsByUserId = async (req, res) => {
	try {
		const userAchievements = await UserAchievements.findAll({
			where: { userId: req.params.userId },
			include: User,
			Achievements
		});
		res.send(userAchievements);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const CreateUserAchievement = async (req, res) => {
	try {
		const userAchievement = await UserAchievements.create({ ...req.body });
		res.send(userAchievement);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetUserAchievementsByUserId,
	CreateUserAchievement
};
