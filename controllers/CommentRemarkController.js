const { CommentRemark } = require('../models')

const CreateCommentRemark = async (req, res) => {
  try {
    const remark = await CommentRemark.create({ ...req.body })
    res.status(201).send(remark)
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

const UpdateCommentRemark = async (req,res) => {
  try {
    const commentRemarkId = parseInt(req.params.commentRemarkId)
    const updatedRemark = await CommentRemark.update(req.body, {
      where: { id: commentRemarkId },
      returning: true
    })
    res.status(200).send(updatedRemark)
  } catch(error) {
    return res.status(500).json({ error: error.message})
  }
}

const DeleteCommentRemark = async (req,res) => {
  try {
    const commentRemarkId = parseInt(req.params.commentRemarkId)
    await CommentRemark.destroy({where: { id: commentRemarkId }})
    res.status(200).send({ message: `Deleted Comment Remark with an id of ${commentRemarkId}`})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
  CreateCommentRemark,
  UpdateCommentRemark,
  DeleteCommentRemark
}