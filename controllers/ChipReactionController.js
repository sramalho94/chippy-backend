const { ChipReaction, Chip } = require('../models');

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
		const createdChipReaction = await ChipReaction.findOne({
			where: { userId: userId, chipId: chipId }
		});
		if (reactionId === 0) {
			const chip = await Chip.findOne({ where: { id: chipId } });
			await Chip.update(
				{ dislikeCount: chip.dislikeCount + 1 },
				{ where: { id: chipId } }
			);
		}
		if (reactionId === 1) {
			const chip = await Chip.findOne({ where: { id: chipId } });
			await Chip.update(
				{ likeCount: chip.likeCount + 1 },
				{ where: { id: chipId } }
			);
		}
		res.status(201).send(createdChipReaction);
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
		if (req.params.reactionId === 0) {
			const chip = await Chip.findOne({
				where: { id: req.params.chipId }
			});
			await Chip.update(
				{
					dislikeCount: chip.dislikeCount + 1,
					likeCount: chip.likeCount - 1
				},
				{ where: { id: chip.id } }
			);
		}
		if (req.params.reactionId === 1) {
			const chip = await Chip.findOne({
				where: { id: req.params.chipId }
			});
			await Chip.update(
				{
					likeCount: chip.likeCount + 1,
					dislikeCount: chip.dislikeCount - 1
				},
				{ where: { id: chip.id } }
			);
		}
		res.status(200).send(updatedChipReaction);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteChipReactionByChipReactionId = async (req, res) => {
	try {
		const chipReactionId = parseInt(req.params.chipReactionId);
		const chipReaction = await ChipReaction.findOne({
			where: { id: chipReactionId }
		});
		const chip = await Chip.findOne({ where: { id: chipReaction.chipId } });
		if (chipReaction.reactionId === 0) {
			await Chip.update(
				{
					dislikeCount: chip.dislikeCount - 1
				},
				{ where: { id: chip.id } }
			);
		}
		if (chipReaction.reactionId === 1) {
			await Chip.update(
				{
					likeCount: chip.likeCount - 1
				},
				{ where: { id: chip.id } }
			);
		}
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
