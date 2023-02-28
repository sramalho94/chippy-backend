const { Chip } = require('../models')

const GetAllChips = async (req, res) => {
  try {
    const chips = await Chip.findAll({})
    res.send(chips)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipsByUserId = async (req, res) => {
  try {
    const chips = await Chip.findAll({ where: { userId: req.params.userId } })
    res.send(chips)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipById = async (req, res) => {
  try {
    const chip = await Chip.findOne({ where: { id: req.params.id } })
    res.send(chip)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CreateChip = async (req, res) => {
  try {
    const chip = await Chip.create({ ...req.body })
    res.send(chip)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdateChip = async (req, res) => {
  try {
    const chipId = parseInt(req.params.chipId)
    const updatedChip = await Chip.update(req.body, {
      where: { id: chipId },
      returning: true
    })
    res.send(updatedChip)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteChip = async (req, res) => {
  try {
    let chipId = req.params.chipId
    await Chip.destroy({ where: { id: chipId } })
    res.send({ message: `Deleted chip with an id of ${chipId}` })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetAllChips,
  GetChipsByUserId,
  GetChipById,
  CreateChip,
  UpdateChip,
  DeleteChip
}
