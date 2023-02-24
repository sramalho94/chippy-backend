'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ChipLocation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
				
		}
	}
	ChipLocation.init(
		{
			chipId: {
				type: DataTypes.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'chips',
					key: 'id'
				}
			},
			locationId: {
				type: DataTypes.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'locations',
					key: 'id'
				}
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
			modelName: 'ChipLocation',
			tableName: 'chip_locations'
		}
	);
	return ChipLocation;
};
