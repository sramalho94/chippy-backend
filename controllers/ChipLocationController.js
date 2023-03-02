const { ChipLocation, Location, Chip } = require('../models');

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

const getChipByChipId = async (id) => {
	try {
		const chip = await Chip.findAll({ where: id });
		return chip;
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
		const chips = [];
		await Promise.all(
			chips.forEach(async (chip) => {
				const chipsToAdd = await getChipByChipId(chip.chipId);
				chips.push(chipsToAdd);
			})
		);
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const PostChipLocation = async (req, res) => {
	try {
		// const
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetChipLocationsByUserId,
	GetChipLocationsByRegion
};
