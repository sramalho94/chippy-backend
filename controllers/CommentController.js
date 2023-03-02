const { Comment } = require('../models')

const UpdateComment = async (req,res) => {
  try {
    const commentId = parseInt(req.params.commentId)
    const updatedComment = await Comment.update(req.body, {
      where: { id: commentId},
      returning: true
    })
    res.send(updatedComment)
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}


const DeleteCommentByCommentId = async (req, res) => {
  try {
    const commentId = (req.params.commentId)
    await Comment.destroy({ where: {id: commentId}})
    res.send({ message: `Deleted comment with an id of ${commentId}`})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

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
DeleteCommentByCommentId,
}