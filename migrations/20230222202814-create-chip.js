'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('chips', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			chipName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			flavor: {
				type: Sequelize.STRING,
				allowNull: false
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false
			},
			MSRP: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			quantity: {
				type: Sequelize.INTEGER
			},
			limited: {
				type: Sequelize.BOOLEAN
			},
			likeCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			dislikeCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0
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
		await queryInterface.dropTable('chips');
	}
};
