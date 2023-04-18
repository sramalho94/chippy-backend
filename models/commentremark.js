'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CommentRemark extends Model {}
  CommentRemark.init(
    {
      commentId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'comments',
          key: 'id'
        }
      },
      remarkId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'comments',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'CommentRemark',
      tableName: 'comment_remarks',
      defaultScope: {
        attributes: ['id', 'commentId', 'remarkId', 'createdAt', 'updatedAt']
      }
    }
  )
  return CommentRemark
}
