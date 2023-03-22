'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Location, {
				foreignKey: 'userId'
			});
			User.hasMany(models.Chip, {
				foreignKey: 'userId'
			});
			User.hasMany(models.ChipLocation, {
				foreignKey: 'userId'
			});
			User.belongsToMany(models.Chip, {
				through: models.Comment,
				as: 'user_comments',
				foreignKey: 'userId'
			});
			User.belongsToMany(models.Achievement, {
				through: models.UserAchievements,
				as: 'user_achievements',
				foreignKey: 'userId'
			});
			User.belongsToMany(models.Chip, {
				through: models.ChipReaction,
				as: 'users_reaction',
				foreignKey: 'userId'
			});
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			passwordDigest: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			}
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users'
		}
	);
	return User;
};
