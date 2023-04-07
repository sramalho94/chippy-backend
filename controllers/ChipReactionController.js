const { ChipReaction } = require('../models');

const GetChipReactionByChipId = async (req, res) => {
	try {
		const chipReaction = await ChipReaction.findAll({
			where: { chipId: req.params.chipId }
		});
		res.status(200).send(chipReaction);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const GetChipReactionByUserId = async (req, res) => {
	try {
		const chipReaction = await ChipReaction.findAll({
			where: { userId: req.params.userId }
		});
		res.status(200).send(chipReaction);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const PostChipReaction = async (req, res) => {
	try {
		const { chipId, userId, reactionId } = req.body;
		const newChipReaction = await ChipReaction.create({
			chipId,
			userId,
			reactionId
		});
		res.status(201).send(newChipReaction);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const UpdateChipReaction = async (req, res) => {
	try {
		const chipReactionId = parseInt(req.params.chipReactionId);
		const updatedChipReaction = await ChipReaction.update(req.body, {
			where: { id: chipReactionId },
			returning: true
		});
		res.status(200).send(updatedChipReaction);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteChipReactionByChipReactionId = async (req, res) => {
	try {
		const chipReactionId = parseInt(req.params.chipReactionId);
		await ChipReaction.destroy({ where: { id: chipReactionId } });
		res.status(200).send({
			message: `Deleted Chip Reaction with an id of ${chipReactionId}`
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	GetChipReactionByChipId,
	GetChipReactionByUserId,
	PostChipReaction,
	UpdateChipReaction,
	DeleteChipReactionByChipReactionId
};
