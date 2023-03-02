const { Comment } = require('../models')

const DeleteCommentByChipId = async (req, res) => {
  try {
    let chipId = req.params.chipId
    await Comment.destroy({ where: {chipId: chipId}})
    res.send({ message: `Deleted comment with a chip id of ${chipId}`})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

module.exports = {
DeleteCommentByChipId,
}