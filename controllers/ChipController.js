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
    const chips = await Chip.findAll({
      where: { userId: req.params.userId }
    })
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

const GetChipsByFlavor = async (req, res) => {
  try {
    const chips = await Chip.findAll({
      where: { flavor: req.params.flavor }
    })
    res.send(chips)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipsByBrand = async (req, res) => {
  try {
    const chips = await Chip.findAll({
      where: { brand: req.params.brand }
    })
    res.send(chips)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipsByChipName = async (req, res) => {
  try {
    const chips = await Chip.findAll({
      where: { chipName: req.params.chipName }
    })
    res.send(chips)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CreateChip = async (req, res) => {
  try {
    const chip = await Chip.create({ ...req.body })
    res.status(200).send(chip)
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
    res.status(200).send(updatedChip)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteChip = async (req, res) => {
  try {
    let chipId = req.params.chipId
    await Chip.destroy({ where: { id: chipId } })
    res.status(200).send({ message: `Deleted chip with an id of ${chipId}` })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetAllChips,
  GetChipsByUserId,
  GetChipById,
  GetChipsByFlavor,
  GetChipsByBrand,
  GetChipsByChipName,
  CreateChip,
  UpdateChip,
  DeleteChip
}
