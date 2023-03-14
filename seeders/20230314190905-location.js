'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = [...Array(100)].map(() => ({
      userId: falso.incrementalNumber({ from: 1, to: 100, step: 1 }),
      street: falso.randStreetAddress(),
      city: falso.randCity(),
      state: falso.randStateAbbr(),
      zipCode: falso.randZipCode(),
      region: falso.randOrdinalDirection(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('locations', locations, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations')
  }
}
