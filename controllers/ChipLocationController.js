const { ChipLocation, Location } = require('../models');

const GetChipLocationsByUserId = async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);
		const chipLocations = await ChipLocation.findAll({ where: userId });
		res.send(chipLocations);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getChipLocationsByLocationId = async (locationId) => {
	try {
		const chipLocations = await ChipLocation.findAll({ where: locationId });
		return chipLocations;
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipLocationsByRegion = async (req, res) => {
	try {
		const region = req.params.region;
		const locations = await Location.findAll({ where: region });
		const chipLocations = [];
		await Promise.all(
			locations.forEach(async (location) => {
				const chipLocationsToAdd = await getChipLocationsByLocationId(
					location.id
				);
				chipLocations.push(chipLocationsToAdd);
			})
		);
		res.send(chipLocations);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetChipLocationsByUserId
};
