'use strict';
const { Model } = require('sequelize');
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
				as: 'commentPost',
				foreignKey: 'commentId'
			});
			Comment.belongsToMany(models.Comment, {
				through: models.CommentRemark,
				as: 'remark',
				foreignKey: 'remarkId'
			});
		}
	}
	Comment.init(
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
			comment: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Comment',
			tableName: 'comments'
		}
	);
	return Comment;
};
