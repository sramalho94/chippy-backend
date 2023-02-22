'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Chip extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
			}
		},
		{
			sequelize,
			modelName: 'Chip',
			tableName: 'chips'
		}
	);
	return Chip;
};
