'use strict';
const falso = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const users = [...Array(100)].map(() => ({
			firstName: falso.randFirstName(),
			lastName: falso.randLastName(),
			username: falso.randUserName(),
			passwordDigest: falso.randPassword(),
			createdAt: new Date(),
			updatedAt: new Date()
		}));
		await queryInterface.bulkInsert('users', users, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users');
	}
};
