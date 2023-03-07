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

const PostChipReaction = async (req, res) => {
  try {
    const { chipId, userId, reactionId } = req.body
    const newChipReaction = await ChipReaction.create({
      chipId,
      userId,
      reactionId
    })
    res.send(newChipReaction)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdateChipReaction = async (req, res) => {
  try {
    const chipReactionId = parseInt(req.params.chipReactionId)
    const updatedChipReaction = await ChipReaction.update(req.body, {
      where: { id: chipReactionId },
      returning: true
    })
    res.send(updatedChipReaction)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteChipReactionByRichReactionId = async (req, res) => {
  try {
    const chipReactionId = parseInt(req.params.chipReactionId)
    await ChipReaction.destroy({ where: { id: chipReactionId } })
    res.send({
      message: `Deleted Chip Reaction with an id of ${chipReactionId}`
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetChipReactionByChipId,
  GetChipReactionByUserId,
  PostChipReaction,
  UpdateChipReaction,
  DeleteChipReactionByRichReactionId
}
