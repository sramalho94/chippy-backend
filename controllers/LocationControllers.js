const { Location } = require('../models')

const GetLocationsById = async (req, res) => {
  try {
    const locations = await Location.findAll({
      where: { userId: req.params.userId }
    })
    res.send(locations)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const CreateLocation = async (req, res) => {
  try {
    const location = await Location.create({ ...req.body })
    res.send(location)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdateLocation = async (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId)
    const updatedLocation = await Location.update(req.body, {
      where: { id: locationId },
      returning: true
    })
    res.send(updatedLocation)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const DeleteLocation = async (req, res) => {
  try {
    let locationId = req.params.locationId
    await Location.destroy({ where: { id: locationId } })
    res.send({ message: `Deleted location with an id of ${locationId}` })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  GetLocationsById,
  CreateLocation,
  UpdateLocation,
  DeleteLocation
}
