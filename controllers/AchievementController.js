const { Achievement } = require('../models')

const GetAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({});
    res.status(200).send(achievements);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const CreateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create({ ...req.body })
    res.status(201).send(achievement)
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

const UpdateAchievement = async (req, res) => {
  try {
    const achievementId = parseInt(req.params.achievementId)
    const updatedAchievement = await Achievement.update(req.body, {
      where: { id: achievementId },
      returning: true
    })
    res.status(200).send(updatedAchievement) 
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteAchievement = async (req, res) => {
  try {
    let achievementId = req.params.achievementId
    await Achievement.destroy({ where: { id: achievementId } })
    res.status(200).send({ message: `Deleted achievement with an id of ${achievementId}`})
  } catch (error) {
    return res.staus(500).json({ error: error.message })
  }
}

module.exports = {
  GetAllAchievements,
  CreateAchievement,
  UpdateAchievement,
  DeleteAchievement
}