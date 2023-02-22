'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Achievement extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Achievement.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			icon: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Achievement',
			tableName: 'achievements'
		}
	);
	return Achievement;
};
