const { UserAchievements, User, Achievement } = require('../models')

const GetUserAchievementsByUserId = async (req, res) => {
  try {
    const userAchievements = await User.findAll({
      where: { id: req.params.userId },
      include: [
        {
          model: Achievement,
          as: 'user_achievements',
          through: { attributes: [] }
        }
      ]
    })
    res.status(200).send(userAchievements)
  } catch (error) {
    console.error('Error in CreateUserAchievement:', error)
    return res.status(500).json({ error: error.message })
  }
}

const CreateUserAchievement = async (req, res) => {
  try {
    const userAchievement = await UserAchievements.create({ ...req.body })
    res.status(201).send(userAchievement)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetUserAchievementsByUserId,
  CreateUserAchievement
}
