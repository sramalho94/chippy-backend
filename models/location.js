'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Location extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Location.init(
		{
			street: DataTypes.STRING,
			street2: DataTypes.STRING,
			city: DataTypes.STRING,
			state: DataTypes.STRING,
			zipCode: DataTypes.INTEGER,
			region: { type: DataTypes.STRING, allowNull: false }
		},
		{
			sequelize,
			modelName: 'Location',
			tableName: 'locations'
		}
	);
	return Location;
};
