const { Location } = require('../models');

const GetLocationsById = async (req, res) => {
	try {
		const locations = await Location.findAll({
			where: { userId: req.params.userId }
		});
		res.status(200).send(locations);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const CreateLocation = async (req, res) => {
	try {
		const location = await Location.create({ ...req.body });
		res.status(201).send(location);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const UpdateLocation = async (req, res) => {
	try {
		const locationId = parseInt(req.params.locationId);
		const updatedLocation = await Location.update(req.body, {
			where: { id: locationId },
			returning: true
		});
		res.status(200).send(updatedLocation);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteLocation = async (req, res) => {
	try {
		let locationId = req.params.locationId;
		await Location.destroy({ where: { id: locationId } });
		res.status(200).send({
			message: `Deleted location with an id of ${locationId}`
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetLocationsById,
	CreateLocation,
	UpdateLocation,
	DeleteLocation
};
