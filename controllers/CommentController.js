const { Comment, Chip, CommentRemark } = require('../models')

const GetAllChipCommentsAndRemarks = async (req, res) => {
  try {
    const comments = await Comment.findAll({ 
      where: { id: req.params.chipId },
      include: Chip, CommentRemark
    })
    res.send(comments)
  } catch (error) {
    return res.send(500).json({ error: error.message})
  }
}

const PostComment = async (req, res) => {
  try {
    const { chipId, userId, comment } = req.body
    const newComment = await Comment.create({
      chipId,
      userId,
      comment
    })
     res.send(newComment)
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

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
UpdateComment,
PostComment,
GetAllChipCommentsAndRemarks

}