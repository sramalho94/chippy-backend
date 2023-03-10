const { Chip } = require('../models');

const GetAllChips = async (req, res) => {
	try {
		const chips = await Chip.findAll({});
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipsByUserId = async (req, res) => {
	try {
		const chips = await Chip.findAll({
			where: { userId: req.params.userId }
		});
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipById = async (req, res) => {
	try {
		const chip = await Chip.findOne({ where: { id: req.params.id } });
		res.send(chip);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipsByFlavor = async (req, res) => {
	try {
		const flavor = req.params.flavor;
		const chips = await Chip.findAll({ where: flavor });
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipsByBrand = async (req, res) => {
	try {
		const brand = req.params.brand;
		const chips = await Chip.findAll({ where: brand });
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipsByChipName = async (req, res) => {
	try {
		const chipName = req.params.chipName;
		const chips = await Chip.findAll({ where: chipName });
		res.send(chips);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const CreateChip = async (req, res) => {
	try {
		const chip = await Chip.create({ ...req.body });
		res.send(chip);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const UpdateChip = async (req, res) => {
	try {
		const chipId = parseInt(req.params.chipId);
		const updatedChip = await Chip.update(req.body, {
			where: { id: chipId },
			returning: true
		});
		res.send(updatedChip);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteChip = async (req, res) => {
	try {
		let chipId = req.params.chipId;
		await Chip.destroy({ where: { id: chipId } });
		res.send({ message: `Deleted chip with an id of ${chipId}` });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

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
};
