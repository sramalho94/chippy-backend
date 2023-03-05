const { ChipReaction } = require('../models')

const GetChipReactionByChipId = async (req, res) => {
  try {
    const chipReaction = await ChipReaction.findAll({
      where: { chipId: req.params.chipId }
    })
    res.send(chipReaction)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipReactionByUserId = async (req, res) => {
  try {
    const chipReaction = await ChipReaction.findAll({
      where: { userd: req.params.userId }
    })
    res.send(chipReaction)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetChipReactionByChipId,
  GetChipReactionByUserId
}
