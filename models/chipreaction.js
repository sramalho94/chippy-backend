'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ChipReaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ChipReaction.init(
		{
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
			reactionId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'ChipReaction',
			tableName: 'chip_reactions'
		}
	);
	return ChipReaction;
};
