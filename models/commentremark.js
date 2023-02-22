'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CommentRemark extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
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
			tableName: 'comment_remarks'
		}
	);
	return CommentRemark;
};
