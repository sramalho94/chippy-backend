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

module.exports = {
  GetAllChips,
  GetChipsByUserId
}
