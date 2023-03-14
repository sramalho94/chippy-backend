'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const chipLocations = [...Array(400)].map(() => ({
      userId: falso.randNumber({ min: 1, max: 100 }),
      chipId: falso.randNumber({ min: 1, max: 100 }),
      locationId: falso.randNumber({ min: 1, max: 100 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('chip_locations', chipLocations, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chip_locations')
  }
}
