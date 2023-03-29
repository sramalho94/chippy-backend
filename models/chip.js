'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chip.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'chip_by_user'
      })

      Chip.belongsToMany(models.Location, {
        through: models.ChipLocation,
        as: 'chips_at_location',
        foreignKey: 'chipId'
      })

      Chip.belongsToMany(models.User, {
        through: models.Comment,
        as: 'chip_comments',
        foreignKey: 'chipId'
      })

      Chip.belongsToMany(models.User, {
        through: models.ChipReaction,
        as: 'chips_reaction',
        foreignKey: 'chipId'
      })
    }
  }
  Chip.init(
    {
      chipName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flavor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      MSRP: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: DataTypes.INTEGER,
      limited: DataTypes.BOOLEAN,
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      dislikeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Chip',
      tableName: 'chips'
    }
  )
  return Chip
}
