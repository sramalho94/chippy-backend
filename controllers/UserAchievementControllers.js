const { UserAchievements } = require('../models')

const GetUserAchievementsByUserId = async (req, res) => {
  try {
    const userAchievements = await UserAchievements.findAll({
      where: { userId: req.params.userId }
    })
    res.send(userAchievements)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetUserAchievementsByUserId
}
