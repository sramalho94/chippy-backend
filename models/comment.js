'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsToMany(models.Comment, {
        through: models.CommentRemark,
        as: 'remarks',
        foreignKey: { name: 'commentId', field: 'commentId' },
        otherKey: { name: 'remarkId', field: 'remarkId' }
      })

      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'comment_by_user'
      })

      Comment.belongsTo(models.Chip, {
        foreignKey: 'chipId',
        as: 'comment_on_chip'
      })
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      chipId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'chips',
          key: 'id'
        }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments'
    }
  )
  return Comment
}
