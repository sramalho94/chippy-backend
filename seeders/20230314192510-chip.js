'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const chips = [...Array(100)].map(() => ({
      chipName: falso.randProductAdjective(),
      flavor: falso.randFood(),
      brand: falso.randBrand(),
      MSRP: falso.randNumber({ min: 0.99, max: 5.99 }),
      quantity: falso.randNumber({ min: 1, max: 24 }),
      limited: falso.randBoolean(),
      likeCount: falso.randNumber({ min: 1, max: 100 }),
      dislikeCount: falso.randNumber({ min: 1, max: 100 }),
      userId: falso.randNumber({ min: 1, max: 100 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('chips', chips, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chips')
  }
}
