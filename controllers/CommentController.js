const { Comment, Chip, CommentRemark, User } = require('../models');

const GetAllChipCommentsAndRemarks = async (req, res) => {
	try {
		const comments = await Comment.findAll({
			where: { chipId: req.params.chipId },
			attributes: [
				'id',
				'chipId',
				'userId',
				'comment',
				'createdAt',
				'updatedAt'
			],
			include: [
				{
					model: Comment,
					as: 'remark',
					through: { attributes: [] }
				},
				{
					model: User, // Include the User model
					as: 'user', // Give it an alias
					attributes: ['id', 'username', 'firstName', 'lastName'] // Specify the attributes you want to include
				}
			]
		});
		res.send(comments);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const PostComment = async (req, res) => {
	try {
		const { chipId, userId, comment } = req.body;
		const newComment = await Comment.create({
			chipId,
			userId,
			comment
		});
		res.send(newComment);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const UpdateComment = async (req, res) => {
	try {
		const commentId = parseInt(req.params.commentId);
		const updatedComment = await Comment.update(req.body, {
			where: { id: commentId },
			returning: true
		});
		res.send(updatedComment);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const DeleteCommentByCommentId = async (req, res) => {
	try {
		const commentId = parseInt(req.params.commentId);
		await Comment.destroy({ where: { id: commentId } });
		res.send({ message: `Deleted comment with an id of ${commentId}` });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	DeleteCommentByCommentId,
	UpdateComment,
	PostComment,
	GetAllChipCommentsAndRemarks
};
