const { ChipLocation, Location, Chip } = require('../models')

const GetChipLocationsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const chipLocations = await Chip.findAll({
      include: [
        {
          model: Location,
          as: 'chips_at_location',
          through: {
            model: ChipLocation, // Include the junction table model
            attributes: [],
            where: { userId: userId } // Filter by userId in the junction table
          },
          required: true
        }
      ]
    })
    res.send(chipLocations)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const GetChipLocationsByRegion = async (req, res) => {
  try {
    const region = req.params.region
    const chipLocations = await Location.findAll({
      where: { region: region },
      include: [
        {
          model: Chip,
          as: 'chip_locations',
          through: {
            attributes: []
          },
          required: true
        }
      ]
    })
    res.send(chipLocations)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const PostChipLocation = async (req, res) => {
  try {
    const { chipId, userId, locationId } = req.body
    const newChipLocation = await ChipLocation.create({
      chipId,
      userId,
      locationId
    })
    res.send(newChipLocation)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdateChipLocationById = async (req, res) => {
  try {
    const chipLocationId = parseInt(req.params.chipLocationId)
    const chipLocation = await ChipLocation.update(req.body, {
      where: { id: chipLocationId },
      returning: true
    })
    res.send(chipLocation)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteChipLocationById = async (req, res) => {
  try {
    const chipLocationId = parseInt(req.params.chipLocationId)
    await ChipLocation.destroy({ where: { id: chipLocationId } })
    res.send({
      message: `Deleted chip location with an id ${chipLocationId}`
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetChipLocationsByUserId,
  GetChipLocationsByRegion,
  PostChipLocation,
  UpdateChipLocationById,
  DeleteChipLocationById
}
