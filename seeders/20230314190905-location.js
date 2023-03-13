'use strict';
const falso = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const locations = [...Array(100)].map(() => ({
			userId: falso.randNumber({ min: 1, max: 100 }),
			street: falso.randStreetAddress(),
			city: falso.randCity(),
			state: falso.randStateAbbr(),
			zipCode: parseInt(falso.randZipCode({ length: 5 })),
			region: falso.randOrdinalDirection(),
			createdAt: new Date(),
			updatedAt: new Date()
		}));
		await queryInterface.bulkInsert('locations', locations, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('locations');
	}
};
