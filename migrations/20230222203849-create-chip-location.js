'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('chip_locations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			chipId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'chips',
					key: 'id'
				}
			},
			locationId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'locations',
					key: 'id'
				}
			},
			userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'users',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('chip_locations');
	}
};
